import { theme } from '@/theme';

export const getColor = (colorKey: keyof typeof theme.colors) => {
    return theme.colors[colorKey]
}

export const getFontSize = (sizeKey: keyof typeof theme.typography.sizes) => {
    return theme.typography.sizes[sizeKey]
}

export const getFontWeight = (weightKey: keyof typeof theme.typography.weights) => {
    return theme.typography.weights[weightKey]
}