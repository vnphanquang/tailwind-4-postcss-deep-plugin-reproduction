import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		transformer: 'postcss',
		postcss: {
			plugins: [tailwindcss()],
		}
	},
});

