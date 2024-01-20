import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		colors: {
			'san-juan': {
					'50': '#f2f7fc',
					'100': '#e1eef8',
					'200': '#c9e2f4',
					'300': '#a4d0ec',
					'400': '#79b6e1',
					'500': '#599bd8',
					'600': '#4581cb',
					'700': '#3b6eba',
					'800': '#355a98',
					'900': '#2c4770',
					'950': '#21304a',
			},
			'minsk': {
					'50': '#eff1fe',
					'100': '#e2e5fd',
					'200': '#cbcefa',
					'300': '#abaff6',
					'400': '#8d89f0',
					'500': '#786ce8',
					'600': '#6950db',
					'700': '#5b41c1',
					'800': '#4a379c',
					'900': '#3c3176',
					'950': '#261e48',
			},
			'mandalay': {
					'50': '#f9f6ed',
					'100': '#f0ead1',
					'200': '#e3d3a5',
					'300': '#d3b671',
					'400': '#c59c4a',
					'500': '#aa8039',
					'600': '#9c6c32',
					'700': '#7d502b',
					'800': '#69432a',
					'900': '#5b3928',
					'950': '#341e14',
			},
			'alpine': {
					'50': '#f9f8ed',
					'100': '#f0efd1',
					'200': '#e3dda5',
					'300': '#d3c771',
					'400': '#c5b14a',
					'500': '#aa9339',
					'600': '#9c7e32',
					'700': '#7d5e2b',
					'800': '#694e2a',
					'900': '#5b4228',
					'950': '#342314',
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
};

