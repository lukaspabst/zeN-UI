export const ZEN_UI_VERSION = '1.1.6';
export const ZEN_PACKAGE_NAME = '@zen-ui-capri/system';

export {
  ZenThemeProvider,
  useZenTheme,
  syncZenScrollbarStyles,
  ZEN_THEMES,
  type ZenThemeId,
  type ZenThemeMode,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeMetadata,
  type ZenThemeTokenOverrides,
  type ZenThemeContextValue,
  type ZenThemeProviderProps,
} from './theme/ZenThemeProvider';

export {
  ZenButton,
  ZenCopyButton,
  type ZenButtonVariant,
  type ZenButtonSize,
  type ZenButtonProps,
  type ZenCopyButtonProps,
} from './components/ZenButton';

export {
  ZenIcon,
  ZEN_ICON_NAMES,
  ZEN_ICON_SIZE_PX,
  ZEN_ICON_SVG_INNER,
  renderZenIconSvgMarkup,
  type ZenIconName,
  type ZenIconSize,
  type ZenIconTone,
  type ZenIconProps,
} from './components/ZenIcon';

export {
  ZenBadge,
  ZenTagList,
  ZenKbd,
  type ZenBadgeTone,
  type ZenBadgeProps,
  type ZenTagListProps,
  type ZenKbdProps,
} from './components/ZenBadge';

export {
  ZenHeading,
  type ZenHeadingLevel,
  type ZenHeadingSize,
  type ZenHeadingProps,
} from './components/ZenHeading';

export {
  ZenCard,
  ZenMetricStrip,
  ZenArchitectureNote,
  ZenCheckList,
  type ZenCardVariant,
  type ZenCardPadding,
  type ZenCardProps,
  type ZenMetricItem,
  type ZenMetricStripProps,
  type ZenArchitectureNoteProps,
  type ZenCheckListProps,
} from './components/ZenCard';

export {
  ZenDossierPanel,
  type ZenDossierItem,
  type ZenDossierPanelProps,
} from './components/ZenDossierPanel';

export {
  ZenTimelineCard,
  type ZenTimelineCardProps,
} from './components/ZenTimelineCard';

export {
  ZenSegmentedControl,
  type ZenSegmentItem,
  type ZenSegmentedControlProps,
} from './components/ZenSegmentedControl';

export {
  ZenTabs,
  type ZenTabItem,
  type ZenTabsProps,
} from './components/ZenTabs';

export {
  ZenInput,
  type ZenInputProps,
} from './components/ZenInput';

export {
  ZenDropdown,
  type ZenDropdownOption,
  type ZenDropdownProps,
} from './components/ZenDropdown';

export {
  ZenSwitch,
  type ZenSwitchProps,
} from './components/ZenSwitch';

export {
  ZenModal,
  type ZenModalProps,
} from './components/ZenModal';

export {
  ZenToastStack,
  useZenToast,
  type ZenToastTone,
  type ZenToastItem,
  type ZenToastStackProps,
} from './components/ZenToast';

export {
  ZenDataTable,
  type ZenTableColumn,
  type ZenDataTableProps,
} from './components/ZenDataTable';

export {
  ZenNavbar,
  type ZenNavbarProps,
} from './components/ZenNavbar';

export {
  ZenAIConstruct,
  type ZenAIPersonaMode,
  type ZenAICameraFraming,
  type ZenAIDirective,
  type ZenAIConstructProps,
} from './components/ZenAIConstruct';

export {
  ZenAmbientBackground,
  type ZenBackgroundVariant,
  type ZenAmbientBackgroundProps,
} from './components/ZenAmbientBackground';

export {
  ZenTextarea,
  ZenNumberStepper,
  ZenCheckbox,
  ZenRadioGroup,
  ZenSlider,
  ZenChipFilter,
  ZenFileUpload,
  type ZenTextareaProps,
  type ZenNumberStepperProps,
  type ZenCheckboxProps,
  type ZenRadioOption,
  type ZenRadioGroupProps,
  type ZenSliderProps,
  type ZenChipOption,
  type ZenChipFilterProps,
  type ZenUploadedFile,
  type ZenFileUploadProps,
} from './components/ZenForms';

export {
  ZenBreadcrumbs,
  ZenPagination,
  ZenStepper,
  ZenSidebar,
  ZenIconButton,
  type ZenBreadcrumbItem,
  type ZenBreadcrumbsProps,
  type ZenPaginationProps,
  type ZenStepItem,
  type ZenStepperProps,
  type ZenSidebarItem,
  type ZenSidebarProps,
  type ZenIconButtonProps,
} from './components/ZenNavigation';

export {
  ZenCommandPalette,
  ZenDrawer,
  ZenAccordion,
  ZenTooltip,
  ZenDivider,
  type ZenCommandItem,
  type ZenCommandPaletteProps,
  type ZenDrawerProps,
  type ZenAccordionItem,
  type ZenAccordionProps,
  type ZenTooltipProps,
  type ZenDividerProps,
} from './components/ZenOverlays';

export {
  ZenSparkline,
  ZenKpiCard,
  ZenProgressBar,
  ZenCircularGauge,
  ZenAvatar,
  ZenCodeBlock,
  type ZenSparklineProps,
  type ZenKpiCardProps,
  type ZenProgressBarProps,
  type ZenCircularGaugeProps,
  type ZenAvatarProps,
  type ZenCodeBlockProps,
} from './components/ZenDataDisplay';

export {
  ZenAlert,
  ZenSkeleton,
  ZenEmptyState,
  type ZenAlertTone,
  type ZenAlertProps,
  type ZenSkeletonProps,
  type ZenEmptyStateProps,
} from './components/ZenFeedback';

export {
  useZenAudioSynth,
  ZEN_SYNTH_PRESETS,
  type ZenSynthPresetId,
  type ZenSynthPreset,
  type UseZenAudioSynthOptions,
  type ZenAudioSynthController,
} from './audio/useZenAudioSynth';

export {
  ZenAudioController,
  type ZenAudioControllerProps,
} from './audio/ZenAudioController';

export {
  ZenTelemetryHud,
  ZenTelemetryInspector,
  DEFAULT_CELESTIAL_CATALOG,
  type CelestialCatalogEntry,
  type ZenTelemetryPayload,
  type ZenTelemetryBridge,
  type ZenTelemetryHudProps,
  type ZenTelemetryTargetId,
  type ZenTelemetryInspectorProps,
} from './cosmos/ZenTelemetryHud';

export {
  default as ZenCosmosCanvas,
  type ZenCosmosCanvasProps,
} from './cosmos/ZenCosmosCanvas';

export {
  ZEN_UNIVERSAL_THEMES,
  ZenThemeController,
  ZenUniversalAudio,
  ZenAIConstructElement,
  ZenAmbientBackgroundElement,
  ZenThemeSwitcherElement,
  ZenIconElement,
  zenTheme,
  zenAudio,
  escapeZenHtml,
  sanitizeZenAssetUrl,
  registerZenElements,
  type ZenUniversalPolarity,
  type ZenUniversalThemeState,
  type ZenThemeSubscriber,
} from './universal/zen-universal';

export {
  CapriEngine,
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
  type CapriAuditViolationCode,
  type CapriAuditViolation,
  type CapriThreatCategory,
  type CapriPromptInjectionThreat,
  type CapriPromptGuardResult,
  type CapriAuditReport,
  type CapriTelemetrySnapshot,
  type CapriLandmarkNode,
  type CapriUserFlowStep,
  type CapriComponentInventory,
  type CapriArchitectureDocu,
  type CapriSubroutineSkill,
  type CapriEngineListener,
} from './capri/capri-engine';


