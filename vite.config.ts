import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
  base: '/minimalist-reich/',
  plugins: [svelte({preprocess: sveltePreprocess()})]
});
