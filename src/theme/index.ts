export * from './colors';

export const theme = {
    colors: {
        primary: '#22223B',
        secondary: '#4A4E69',
        accent: '#9A8C98',
        interactive: '#C9ADA7',
        background: '#F2E9E4',
    },
    typography: {
        fontPrimary: 'var(--font-inter)',
        fontSecondary: 'var(--font-open-sans)',
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
        },
    },
} as const;