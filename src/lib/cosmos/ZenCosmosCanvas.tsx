import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import {
  DEFAULT_CELESTIAL_CATALOG,
  ZenTelemetryHud,
  type CelestialCatalogEntry,
  type ZenTelemetryBridge,
  type ZenTelemetryTargetId,
} from './ZenTelemetryHud';
import { useZenTheme } from '../theme/ZenThemeProvider';

export interface ZenCosmosCanvasProps {
  readonly scrollProgressRef?: React.RefObject<number>;
  readonly lockedTarget?: ZenTelemetryTargetId;
  readonly paused?: boolean;
  readonly timeScale?: number;
  readonly catalog?: readonly CelestialCatalogEntry[];
}

interface CelestialBodyState {
  readonly pos: THREE.Vector3;
  readonly vel: THREE.Vector3;
  readonly acc: THREE.Vector3;
  readonly mass: number;
  readonly luminosity: number;
  readonly radius: number;
}

const STARFIELD_VERTEX_SHADER = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(aSize * (18.0 / -mvPosition.z), 1.2, 4.2);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STARFIELD_FRAGMENT_SHADER = `
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;
    float airy = exp(-r * r * 5.2);
    gl_FragColor = vec4(vColor * (1.0 + airy * 0.45), airy * 0.92);
  }
`;

const NOISE_GLSL_CHUNK = `
  float hash31(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash31(i + vec3(0,0,0)), hash31(i + vec3(1,0,0)), f.x),
        mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x),
        f.y
      ),
      mix(
        mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
        mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x),
        f.y
      ),
      f.z
    );
  }

  float fbm6(vec3 p) {
    float v = 0.0;
    float amp = 0.5;
    mat3 rot = mat3(
      0.00,  0.80,  0.60,
     -0.80,  0.36, -0.48,
     -0.60, -0.48,  0.64
    );
    for (int i = 0; i < 6; i++) {
      v += amp * noise3D(p);
      p = rot * p * 2.07 + vec3(1.7, 9.2, 3.4);
      amp *= 0.48;
    }
    return v;
  }

  float ridgedFbm(vec3 p) {
    float v = 0.0;
    float amp = 0.55;
    float weight = 1.0;
    for (int i = 0; i < 5; i++) {
      float n = 1.0 - abs(noise3D(p) * 2.0 - 1.0);
      n = n * n * weight;
      weight = clamp(n * 1.8, 0.0, 1.0);
      v += n * amp;
      p *= 2.15;
      amp *= 0.48;
    }
    return v;
  }
`;

const SOLAR_PHOTOSPHERE_VERTEX = `
  uniform float uTime;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  void main() {
    vLocalPos = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SOLAR_PHOTOSPHERE_FRAGMENT = `
  uniform float uTime;
  uniform vec3 uCoreColor;
  uniform vec3 uEdgeColor;
  uniform vec3 uSpotColor;
  uniform float uGlowGain;
  uniform float uGranuleScale;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  ${NOISE_GLSL_CHUNK}

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 n = normalize(vWorldNormal);
    float mu = clamp(dot(n, viewDir), 0.0, 1.0);

    vec3 flowPos = vLocalPos * uGranuleScale + vec3(uTime * 0.14, -uTime * 0.11, uTime * 0.09);
    float gran = fbm6(flowPos);
    float filaments = ridgedFbm(vLocalPos * (uGranuleScale * 0.75) - vec3(uTime * 0.18));

    float spotField = fbm6(vLocalPos * 3.2 + vec3(0.0, uTime * 0.04, 0.0));
    float sunspotMask = smoothstep(0.64, 0.73, spotField);

    float limbDarkening = pow(mu, 0.52);
    float spiculeRim = pow(1.0 - mu, 3.2) * (0.6 + 0.8 * filaments);

    vec3 photosphere = mix(uEdgeColor, uCoreColor, clamp(gran * 1.15 + filaments * 0.35, 0.0, 1.0));
    photosphere = mix(photosphere, uSpotColor, sunspotMask * 0.88);
    photosphere *= (0.38 + 0.72 * limbDarkening);
    photosphere += uCoreColor * filaments * 0.42 * (1.0 - sunspotMask);
    photosphere += mix(uEdgeColor, vec3(1.0, 0.95, 0.82), 0.4) * spiculeRim * 1.35;

    gl_FragColor = vec4(photosphere * uGlowGain, 1.0);
  }
`;

const CORONA_HALO_VERTEX = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  void main() {
    vLocalPos = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CORONA_HALO_FRAGMENT = `
  uniform float uTime;
  uniform vec3 uCoronaColor;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  ${NOISE_GLSL_CHUNK}

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 n = normalize(vWorldNormal);
    float ndv = abs(dot(n, viewDir));
    float radialFade = pow(clamp(ndv, 0.0, 1.0), 3.2);
    float streamer = ridgedFbm(vLocalPos * 6.0 + vec3(uTime * 0.35, -uTime * 0.28, uTime * 0.22));
    float alpha = radialFade * (0.25 + streamer * 0.75);
    gl_FragColor = vec4(uCoronaColor * (1.1 + streamer * 0.9), clamp(alpha * 0.55, 0.0, 0.75));
  }
`;

const TRISOLARIS_VERTEX_SHADER = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  void main() {
    vLocalPos = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const TRISOLARIS_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uSun0Pos;
  uniform vec3 uSun1Pos;
  uniform vec3 uSun2Pos;
  uniform float uTidalHeat;
  uniform float uBolometricFlux;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPos;

  ${NOISE_GLSL_CHUNK}

  void main() {
    vec3 p = vLocalPos * 3.8;
    float continent = fbm6(p);
    float mountains = ridgedFbm(p * 1.85 + vec3(2.4, -1.1, 0.7));
    float microCrater = ridgedFbm(p * 6.5);
    float heightField = continent * 0.55 + mountains * 0.35 + microCrater * 0.10;

    vec3 dPdx = dFdx(vWorldPosition);
    vec3 dPdy = dFdy(vWorldPosition);
    float dHdx = dFdx(heightField);
    float dHdy = dFdy(heightField);
    vec3 baseNorm = normalize(vWorldNormal);
    vec3 surfGrad = (dHdx * cross(baseNorm, dPdy) + dHdy * cross(dPdx, baseNorm));
    vec3 n = normalize(baseNorm - surfGrad * 2.8);

    float riftNoise = abs(fbm6(vLocalPos * 4.6 + vec3(1.2, 3.4, -2.1)) - 0.48);
    float riftMask = smoothstep(0.026, 0.003, riftNoise) * smoothstep(0.32, 0.58, mountains);

    vec3 cloudCoord = vec3(
      vLocalPos.x * cos(uTime * 0.08) - vLocalPos.z * sin(uTime * 0.08),
      vLocalPos.y * 1.6,
      vLocalPos.x * sin(uTime * 0.08) + vLocalPos.z * cos(uTime * 0.08)
    );
    float cloudSwirl = fbm6(cloudCoord * 3.4 + vec3(fbm6(cloudCoord * 2.0)));
    float cloudMask = smoothstep(0.52, 0.74, cloudSwirl) * clamp(1.2 - uBolometricFlux * 0.35, 0.15, 0.9);

    vec3 deepBasaltOcean = vec3(0.04, 0.08, 0.15);
    vec3 lowlandSilicate = vec3(0.22, 0.19, 0.16);
    vec3 highlandGranite = vec3(0.42, 0.37, 0.33);
    vec3 alpinePeak = vec3(0.72, 0.75, 0.80);

    vec3 baseTerrain = deepBasaltOcean;
    if (heightField > 0.42) {
      baseTerrain = mix(lowlandSilicate, highlandGranite, smoothstep(0.42, 0.64, heightField));
      baseTerrain = mix(baseTerrain, alpinePeak, smoothstep(0.64, 0.82, heightField));
    } else {
      baseTerrain = mix(deepBasaltOcean, vec3(0.08, 0.15, 0.24), smoothstep(0.28, 0.42, heightField));
    }

    float freezeFactor = clamp(1.0 - uBolometricFlux * 0.65, 0.0, 0.88);
    vec3 cryoIce = mix(vec3(0.68, 0.78, 0.90), vec3(0.90, 0.95, 1.0), mountains);
    vec3 surfaceAlbedo = mix(baseTerrain, cryoIce, freezeFactor * 0.78);
    surfaceAlbedo = mix(surfaceAlbedo, vec3(0.92, 0.94, 0.98), cloudMask * 0.65);

    vec3 v0 = uSun0Pos - vWorldPosition;
    vec3 v1 = uSun1Pos - vWorldPosition;
    vec3 v2 = uSun2Pos - vWorldPosition;
    vec3 l0 = normalize(v0);
    vec3 l1 = normalize(v1);
    vec3 l2 = normalize(v2);

    float d0Sq = max(0.18, dot(v0, v0));
    float d1Sq = max(0.18, dot(v1, v1));
    float d2Sq = max(0.18, dot(v2, v2));

    float ndl0 = max(dot(n, l0), 0.0);
    float ndl1 = max(dot(n, l1), 0.0);
    float ndl2 = max(dot(n, l2), 0.0);

    vec3 colG2V = vec3(1.0, 0.93, 0.80);
    vec3 colK1V = vec3(1.0, 0.68, 0.28);
    vec3 colMDwarf = vec3(0.96, 0.32, 0.12);

    float irr0 = (1.52 / d0Sq) * ndl0;
    float irr1 = (0.65 / d1Sq) * ndl1;
    float irr2 = (0.18 / d2Sq) * ndl2;
    float localIrradiance = irr0 + irr1 + irr2;

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float oceanMask = (1.0 - smoothstep(0.39, 0.44, heightField)) * (1.0 - freezeFactor) * (1.0 - cloudMask);
    float spec0 = pow(max(dot(reflect(-l0, n), viewDir), 0.0), 28.0) * oceanMask * (1.52 / d0Sq);
    float spec1 = pow(max(dot(reflect(-l1, n), viewDir), 0.0), 28.0) * oceanMask * (0.65 / d1Sq);

    vec3 litPlanet = surfaceAlbedo * (
      vec3(0.03, 0.04, 0.06)
      + colG2V * irr0 * 0.95
      + colK1V * irr1 * 0.95
      + colMDwarf * irr2 * 0.95
    ) + colG2V * spec0 * 0.45 + colK1V * spec1 * 0.45;

    float subStellarMelt = smoothstep(1.4, 3.5, localIrradiance) * ridgedFbm(p * 3.5);
    float lavaIntensity = clamp(riftMask * (uTidalHeat * 2.2 + localIrradiance * 0.65) + subStellarMelt * 0.85, 0.0, 2.5);
    vec3 magmaColor = mix(vec3(0.95, 0.18, 0.02), vec3(1.0, 0.85, 0.28), clamp(lavaIntensity * 0.55, 0.0, 1.0));

    float rim = pow(1.0 - max(dot(viewDir, baseNorm), 0.0), 3.0);
    vec3 atmoColor = mix(vec3(0.32, 0.60, 0.96), vec3(1.0, 0.48, 0.15), clamp(uBolometricFlux * 0.45, 0.0, 1.0));

    vec3 finalCol = litPlanet + magmaColor * lavaIntensity + atmoColor * rim * 0.48;
    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

function seedThreeBodyEpoch(
  suns: readonly CelestialBodyState[],
  trisolaris: CelestialBodyState
): void {
  const G = 1.5;
  const m0 = suns[0].mass;
  const m1 = suns[1].mass;
  const m2 = suns[2].mass;
  const m01 = m0 + m1;
  const mTot = m01 + m2;

  const aIn = 0.96;
  const aOut = 1.76;
  const vRelIn = Math.sqrt((G * m01) / (aIn + 0.02));
  const vRelOut = -Math.sqrt((G * mTot) / (aOut + 0.05));

  suns[0].pos.set((-m1 / m01) * aIn, (-m2 / mTot) * -aOut, 0);
  suns[0].vel.set((-m2 / mTot) * vRelOut, (-m1 / m01) * vRelIn, 0.08);
  suns[0].acc.set(0, 0, 0);

  suns[1].pos.set((m0 / m01) * aIn, (-m2 / mTot) * -aOut, 0);
  suns[1].vel.set((-m2 / mTot) * vRelOut, (m0 / m01) * vRelIn, -0.08);
  suns[1].acc.set(0, 0, 0);

  suns[2].pos.set(0, (m01 / mTot) * -aOut, 0);
  suns[2].vel.set((m01 / mTot) * vRelOut, 0, 0);
  suns[2].acc.set(0, 0, 0);

  trisolaris.pos.set(-1.2, -0.6, 0.08);
  trisolaris.vel.set(-1.5, 0.3, 0.05);
  trisolaris.acc.set(0, 0, 0);
}

interface CosmosSceneInternalProps {
  readonly scrollProgressRef?: React.RefObject<number>;
  readonly pointerNdcRef: React.RefObject<THREE.Vector2>;
  readonly bridgeRef: React.RefObject<ZenTelemetryBridge | null>;
  readonly reducedMotion: boolean;
  readonly paused: boolean;
  readonly timeScale: number;
  readonly catalog: readonly CelestialCatalogEntry[];
}

function CosmosSceneInternal({
  scrollProgressRef,
  pointerNdcRef,
  bridgeRef,
  reducedMotion,
  paused,
  timeScale,
  catalog,
}: CosmosSceneInternalProps) {
  const systemGroupRef = useRef<THREE.Group>(null);
  const sun0Ref = useRef<THREE.Group>(null);
  const sun1Ref = useRef<THREE.Group>(null);
  const sun2Ref = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const starfieldRef = useRef<THREE.Points>(null);
  const lastScrollRef = useRef<number>(0);
  const scrollVelRef = useRef<number>(0);
  const hoverSlowdownRef = useRef<number>(1);

  const {
    sun0Geo,
    sun1Geo,
    sun2Geo,
    planetGeo,
    sunShaderMats,
    coronaShaderMats,
    trisolarisShaderMat,
    starfieldMat,
  } = useMemo(() => {
    const makeSunMat = (
      coreHex: string,
      edgeHex: string,
      spotHex: string,
      gain: number,
      scale: number
    ) =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCoreColor: { value: new THREE.Color(coreHex) },
          uEdgeColor: { value: new THREE.Color(edgeHex) },
          uSpotColor: { value: new THREE.Color(spotHex) },
          uGlowGain: { value: gain },
          uGranuleScale: { value: scale },
        },
        vertexShader: SOLAR_PHOTOSPHERE_VERTEX,
        fragmentShader: SOLAR_PHOTOSPHERE_FRAGMENT,
        toneMapped: false,
      });

    const makeCoronaMat = (coronaHex: string) =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCoronaColor: { value: new THREE.Color(coronaHex) },
        },
        vertexShader: CORONA_HALO_VERTEX,
        fragmentShader: CORONA_HALO_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        toneMapped: false,
      });

    const sMats = [
      makeSunMat('#FFF3D1', '#D97706', '#290D02', 1.18, 8.5),
      makeSunMat('#FDBA74', '#C2410C', '#240A01', 1.12, 7.2),
      makeSunMat('#FB7185', '#7F1D1D', '#180303', 1.05, 5.0),
    ];

    const cMats = [
      makeCoronaMat('#FFB347'),
      makeCoronaMat('#F97316'),
      makeCoronaMat('#EF4444'),
    ];

    const planetShader = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSun0Pos: { value: new THREE.Vector3() },
        uSun1Pos: { value: new THREE.Vector3() },
        uSun2Pos: { value: new THREE.Vector3() },
        uTidalHeat: { value: 0.4 },
        uBolometricFlux: { value: 1.0 },
      },
      vertexShader: TRISOLARIS_VERTEX_SHADER,
      fragmentShader: TRISOLARIS_FRAGMENT_SHADER,
      toneMapped: false,
    });

    const sfMat = new THREE.ShaderMaterial({
      vertexShader: STARFIELD_VERTEX_SHADER,
      fragmentShader: STARFIELD_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return {
      sun0Geo: new THREE.SphereGeometry(0.43, 48, 48),
      sun1Geo: new THREE.SphereGeometry(0.33, 48, 48),
      sun2Geo: new THREE.SphereGeometry(0.24, 48, 48),
      planetGeo: new THREE.SphereGeometry(0.19, 48, 48),
      sunShaderMats: sMats,
      coronaShaderMats: cMats,
      trisolarisShaderMat: planetShader,
      starfieldMat: sfMat,
    };
  }, []);

  const { suns, trisolaris } = useMemo(() => {
    const sList: readonly CelestialBodyState[] = [
      {
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        acc: new THREE.Vector3(),
        mass: 1.1,
        luminosity: 1.52,
        radius: 0.43,
      },
      {
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        acc: new THREE.Vector3(),
        mass: 0.91,
        luminosity: 0.5,
        radius: 0.33,
      },
      {
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        acc: new THREE.Vector3(),
        mass: 0.54,
        luminosity: 0.08,
        radius: 0.24,
      },
    ];
    const pState: CelestialBodyState = {
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      acc: new THREE.Vector3(),
      mass: 0.000003,
      luminosity: 0,
      radius: 0.19,
    };
    seedThreeBodyEpoch(sList, pState);
    return { suns: sList, trisolaris: pState };
  }, []);

  const starfieldGeo = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#DCE8FF'),
      new THREE.Color('#FFF8E7'),
      new THREE.Color('#FFE4B5'),
      new THREE.Color('#FFC699'),
    ];
    for (let i = 0; i < count; i++) {
      const r = 5.8 + Math.random() * 11.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.85 + Math.pow(Math.random(), 2.1) * 2.25;
      const col = palette[i % palette.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      sun0Geo.dispose();
      sun1Geo.dispose();
      sun2Geo.dispose();
      planetGeo.dispose();
      starfieldGeo.dispose();
      starfieldMat.dispose();
      trisolarisShaderMat.dispose();
      sunShaderMats.forEach((m) => m.dispose());
      coronaShaderMats.forEach((m) => m.dispose());
    };
  }, [
    sun0Geo,
    sun1Geo,
    sun2Geo,
    planetGeo,
    starfieldGeo,
    starfieldMat,
    trisolarisShaderMat,
    sunShaderMats,
    coronaShaderMats,
  ]);

  const diff = useMemo(() => new THREE.Vector3(), []);
  const worldSun0 = useMemo(() => new THREE.Vector3(), []);
  const worldSun1 = useMemo(() => new THREE.Vector3(), []);
  const worldSun2 = useMemo(() => new THREE.Vector3(), []);
  const worldPlanet = useMemo(() => new THREE.Vector3(), []);
  const projectedVec = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame((state, delta) => {
    const scroll = scrollProgressRef?.current ?? 0;
    const clampedDelta = Math.min(delta, 0.035);

    const rawScrollVel =
      (scroll - lastScrollRef.current) / Math.max(clampedDelta, 0.001);
    lastScrollRef.current = scroll;
    scrollVelRef.current = THREE.MathUtils.lerp(
      scrollVelRef.current,
      rawScrollVel,
      clampedDelta * 12
    );

    const baseRate = 0.62 * timeScale;
    const rawTimeRate =
      scrollVelRef.current < -0.015
        ? THREE.MathUtils.clamp(scrollVelRef.current * 4.5, -3.2, -0.15)
        : THREE.MathUtils.clamp(
            baseRate + Math.max(0, scrollVelRef.current) * 4.2,
            0.15,
            3.5
          );
    const signedTimeRate =
      reducedMotion || paused ? 0 : rawTimeRate * hoverSlowdownRef.current;

    const subSteps = 12;
    const dt = (clampedDelta * signedTimeRate) / subSteps;
    const G = 1.5;
    const starSofteningSq = 0.04;
    const planetSofteningSq = 0.05;

    const computeAccelerations = () => {
      for (let i = 0; i < 3; i++) {
        suns[i].acc.set(0, 0, 0);
        for (let j = 0; j < 3; j++) {
          if (i === j) continue;
          diff.subVectors(suns[j].pos, suns[i].pos);
          const distSq = diff.lengthSq() + starSofteningSq;
          const invDistCube = 1.0 / Math.pow(distSq, 1.5);
          suns[i].acc.addScaledVector(diff, G * suns[j].mass * invDistCube);
        }
      }

      trisolaris.acc.set(0, 0, 0);
      for (let j = 0; j < 3; j++) {
        diff.subVectors(suns[j].pos, trisolaris.pos);
        const distSq = diff.lengthSq() + planetSofteningSq;
        const invDistCube = 1.0 / Math.pow(distSq, 1.5);
        trisolaris.acc.addScaledVector(diff, G * suns[j].mass * invDistCube);
      }
    };

    if (signedTimeRate !== 0) {
      computeAccelerations();
      for (let step = 0; step < subSteps; step++) {
        for (let i = 0; i < 3; i++) {
          suns[i].vel.addScaledVector(suns[i].acc, 0.5 * dt);
          suns[i].pos.addScaledVector(suns[i].vel, dt);
        }
        trisolaris.vel.addScaledVector(trisolaris.acc, 0.5 * dt);
        trisolaris.pos.addScaledVector(trisolaris.vel, dt);

        computeAccelerations();

        for (let i = 0; i < 3; i++) {
          suns[i].vel.addScaledVector(suns[i].acc, 0.5 * dt);
        }
        trisolaris.vel.addScaledVector(trisolaris.acc, 0.5 * dt);
      }

      const escapeRadiusSq = 17.64;
      let bodyEjected =
        trisolaris.pos.lengthSq() > escapeRadiusSq &&
        trisolaris.pos.dot(trisolaris.vel) > 0;
      for (let i = 0; i < 3; i++) {
        if (
          suns[i].pos.lengthSq() > escapeRadiusSq &&
          suns[i].pos.dot(suns[i].vel) > 0
        ) {
          bodyEjected = true;
        }
      }
      if (bodyEjected) {
        seedThreeBodyEpoch(suns, trisolaris);
      }
    }

    const sunGroups = [sun0Ref.current, sun1Ref.current, sun2Ref.current];
    const baseGains = [1.18, 1.12, 1.05];
    for (let i = 0; i < 3; i++) {
      const g = sunGroups[i];
      if (g) {
        g.position.copy(suns[i].pos);
        g.rotation.y += clampedDelta * signedTimeRate * (0.28 + i * 0.12);
        g.scale.setScalar(1);
      }
      sunShaderMats[i].uniforms.uTime.value +=
        clampedDelta * signedTimeRate * 1.4;
      coronaShaderMats[i].uniforms.uTime.value +=
        clampedDelta * signedTimeRate * 1.4;
      sunShaderMats[i].uniforms.uGlowGain.value = baseGains[i];
    }

    if (planetGroupRef.current) {
      planetGroupRef.current.position.copy(trisolaris.pos);
      planetGroupRef.current.rotation.y +=
        clampedDelta * signedTimeRate * 0.65;
      planetGroupRef.current.rotation.z = 0.41;
    }

    let bolometricFlux = 0;
    let tidalHeating = 0;
    let dominantSunIdx = 0;
    let maxPull = -1;
    for (let i = 0; i < 3; i++) {
      const dSq = Math.max(0.22, trisolaris.pos.distanceToSquared(suns[i].pos));
      bolometricFlux += suns[i].luminosity / dSq;
      const d6 = dSq * dSq * dSq;
      tidalHeating += (suns[i].mass * suns[i].mass) / (d6 * 4.5);
      const pull = suns[i].mass / dSq;
      if (pull > maxPull) {
        maxPull = pull;
        dominantSunIdx = i;
      }
    }

    if (systemGroupRef.current) {
      systemGroupRef.current.updateMatrixWorld(true);
    }

    if (
      sun0Ref.current &&
      sun1Ref.current &&
      sun2Ref.current &&
      planetGroupRef.current
    ) {
      sun0Ref.current.getWorldPosition(worldSun0);
      sun1Ref.current.getWorldPosition(worldSun1);
      sun2Ref.current.getWorldPosition(worldSun2);
      planetGroupRef.current.getWorldPosition(worldPlanet);
      trisolarisShaderMat.uniforms.uSun0Pos.value.copy(worldSun0);
      trisolarisShaderMat.uniforms.uSun1Pos.value.copy(worldSun1);
      trisolarisShaderMat.uniforms.uSun2Pos.value.copy(worldSun2);

      const ndc = pointerNdcRef.current;
      const uiBlocked = ndc.x < -10;

      raycaster.setFromCamera(ndc, state.camera);
      const worldCenters = [worldSun0, worldSun1, worldSun2, worldPlanet];
      let hoveredIdx = -1;
      let bestDistSq = 999;

      if (!uiBlocked) {
        for (let i = 0; i < 4; i++) {
          const hitR = catalog[i]?.hitRadius ?? 0.4;
          const distSq = raycaster.ray.distanceSqToPoint(worldCenters[i]);
          if (distSq <= hitR * hitR && distSq < bestDistSq) {
            bestDistSq = distSq;
            hoveredIdx = i;
          }
        }
      }

      hoverSlowdownRef.current = THREE.MathUtils.lerp(
        hoverSlowdownRef.current,
        hoveredIdx !== -1 ? 0.0 : 1.0,
        clampedDelta * 18
      );

      for (let i = 0; i < 3; i++) {
        const g = sunGroups[i];
        if (g && hoveredIdx === i) {
          g.scale.setScalar(1.12);
        }
      }
      if (planetGroupRef.current) {
        planetGroupRef.current.scale.setScalar(hoveredIdx === 3 ? 1.48 : 1.32);
      }

      if (hoveredIdx !== -1 && catalog[hoveredIdx]) {
        const meta = catalog[hoveredIdx];
        projectedVec.copy(worldCenters[hoveredIdx]).project(state.camera);
        const screenX = (projectedVec.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (-projectedVec.y * 0.5 + 0.5) * window.innerHeight;
        const rawSpeed =
          hoveredIdx < 3
            ? suns[hoveredIdx].vel.length()
            : trisolaris.vel.length();
        const velocityLabel = `${(rawSpeed * 29.8).toFixed(1)} km/s`;

        let statusLabel = 'Inner Binary Primary · Barycentric Core';
        if (hoveredIdx === 3) {
          const hostNames = ['Alpha Cen A', 'Alpha Cen B', 'Proxima C'];
          const era =
            bolometricFlux > 1.35
              ? 'CHAOTIC ERA · SCORCHING'
              : bolometricFlux < 0.55
                ? 'CHAOTIC ERA · FROZEN'
                : 'STABLE ERA · TEMPERATE';
          statusLabel = `${era} (Pull: ${hostNames[dominantSunIdx]})`;
        } else if (hoveredIdx === 1) {
          statusLabel = 'Inner Binary Companion · Eccentric Pair';
        } else if (hoveredIdx === 2) {
          statusLabel = 'Retrograde Outer Perturber · Flare Active';
        }

        bridgeRef.current?.commitFrame({
          badge: meta.badge,
          name: meta.name,
          classification: meta.classification,
          accentHex: meta.accentHex,
          reticleSize: meta.reticleSize,
          screenX,
          screenY,
          massLabel: meta.massLabel,
          tempLumLabel: meta.tempLumLabel,
          velocityLabel,
          statusLabel,
        });
      } else {
        bridgeRef.current?.commitFrame(null);
      }
    }

    trisolarisShaderMat.uniforms.uTime.value +=
      clampedDelta * signedTimeRate * 0.9;
    trisolarisShaderMat.uniforms.uBolometricFlux.value = THREE.MathUtils.lerp(
      trisolarisShaderMat.uniforms.uBolometricFlux.value,
      bolometricFlux,
      clampedDelta * 4
    );
    trisolarisShaderMat.uniforms.uTidalHeat.value = THREE.MathUtils.lerp(
      trisolarisShaderMat.uniforms.uTidalHeat.value,
      THREE.MathUtils.clamp(tidalHeating, 0.05, 2.5),
      clampedDelta * 4
    );

    if (starfieldRef.current) {
      starfieldRef.current.rotation.y +=
        clampedDelta * signedTimeRate * 0.015;
    }
  });

  return (
    <group ref={systemGroupRef}>
      <points
        ref={starfieldRef}
        geometry={starfieldGeo}
        material={starfieldMat}
      />

      <group ref={sun0Ref}>
        <mesh geometry={sun0Geo} material={sunShaderMats[0]} />
        <mesh
          geometry={sun0Geo}
          material={coronaShaderMats[0]}
          scale={1.22}
        />
        <pointLight color="#FFF2D6" intensity={7.5} distance={6} />
      </group>

      <group ref={sun1Ref}>
        <mesh geometry={sun1Geo} material={sunShaderMats[1]} />
        <mesh
          geometry={sun1Geo}
          material={coronaShaderMats[1]}
          scale={1.22}
        />
        <pointLight color="#FFAE52" intensity={5.2} distance={6} />
      </group>

      <group ref={sun2Ref}>
        <mesh geometry={sun2Geo} material={sunShaderMats[2]} />
        <mesh
          geometry={sun2Geo}
          material={coronaShaderMats[2]}
          scale={1.25}
        />
        <pointLight color="#F95738" intensity={3.8} distance={5} />
      </group>

      <group ref={planetGroupRef} scale={1.32}>
        <mesh geometry={planetGeo} material={trisolarisShaderMat} />
      </group>
    </group>
  );
}

export default function ZenCosmosCanvas({
  scrollProgressRef,
  paused = false,
  timeScale = 1,
  catalog = DEFAULT_CELESTIAL_CATALOG,
}: ZenCosmosCanvasProps) {
  const { reducedMotion, polarity } = useZenTheme();
  const pointerNdcRef = useRef<THREE.Vector2>(new THREE.Vector2(-99, -99));
  const bridgeRef = useRef<ZenTelemetryBridge | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (bridgeRef.current?.isOccludedTarget(e.target)) {
        pointerNdcRef.current.set(-99, -99);
        return;
      }
      pointerNdcRef.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
          polarity === 'light' ? 'opacity-25' : 'opacity-100'
        }`}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.2], fov: 44 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.25} />
          <Suspense fallback={null}>
            <CosmosSceneInternal
              scrollProgressRef={scrollProgressRef}
              pointerNdcRef={pointerNdcRef}
              bridgeRef={bridgeRef}
              reducedMotion={reducedMotion}
              paused={paused}
              timeScale={timeScale}
              catalog={catalog}
            />
          </Suspense>
          <EffectComposer>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.78}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>

      <ZenTelemetryHud bridgeRef={bridgeRef} />
    </>
  );
}
