import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';

export default defineConfig({
	extensions: ['.svelte', '.svx'],
	plugins: [sveltekit()],
	preprocess: [mdsvex()]
});
