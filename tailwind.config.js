// tailwind.config.js
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./page-components/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layout/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			prefix: 'nextui', // prefix for themes variables
			addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
			defaultTheme: 'light', // default theme from the themes object
			defaultExtendTheme: 'light', // default theme to extend on custom themes
			layout: {}, // common layout tokens (applied to all themes)
			themes: {
				light: {
					layout: {}, // light theme layout tokens
					colors: {}, // light theme colors
				},
				dark: {
					layout: {}, // dark theme layout tokens
					colors: {}, // dark theme colors
				},
				// ... custom themes
			},
		}),
	],
};

export default config;
