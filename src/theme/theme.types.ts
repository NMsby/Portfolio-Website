export type ColorScheme = {
    primary: string;
    secondary: string;
    accent: string;
    interactive: string;
    background: string;
}

export type Typography = {
    fontPrimary: string;
    fontSecondary: string;
    weights: {
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    sizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
    };
}