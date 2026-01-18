/**
 * Dynamically loads Google Fonts
 */
export const availableFonts = [
    { name: 'Inter', label: 'Inter (Modern Sans)', weights: [300, 400, 500, 600, 700] },
    { name: 'Outfit', label: 'Outfit (Geometric)', weights: [300, 400, 500, 600, 700] },
    { name: 'Space Grotesk', label: 'Space Grotesk (Tech)', weights: [300, 400, 500, 600, 700] },
    { name: 'Plus Jakarta Sans', label: 'Plus Jakarta (Humanist)', weights: [300, 400, 500, 600, 700] },
    { name: 'Cinzel', label: 'Cinzel (Elegant)', weights: [400, 500, 600, 700, 800] }
];

/**
 * Dynamically loads Google Fonts
 */
export const loadGoogleFont = (fontFamily: string, weights?: number[]) => {
    const fontName = fontFamily.replace(/ /g, '+');

    // Determine weights: explicit argument > known font defaults > generic default
    let activeWeights = weights;
    if (!activeWeights) {
        const knownFont = availableFonts.find(f => f.name === fontFamily);
        activeWeights = knownFont ? knownFont.weights : [300, 400, 500, 600, 700];
    }

    const weightStr = activeWeights.join(';');
    const href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weightStr}&display=swap`;

    if (document.querySelector(`link[href="${href}"]`)) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
};
