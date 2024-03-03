// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				offer: resolve(__dirname, 'offer.html'),
				'about-us': resolve(__dirname, 'about-us.html'),
				contact: resolve(__dirname, 'contact.html'),
			},
		},
	},
})
