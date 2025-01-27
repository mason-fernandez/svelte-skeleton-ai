import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

export default {
	content: [contentPath(import.meta.url, 'svelte'),
		'./src/**/*.{html,js,svelte,ts}' ],

	theme: {
		extend: {}
	},

	plugins: [typography, forms, skeleton({
		// NOTE: each theme included will increase the size of your CSS bundle
		themes: [ themes.cerberus, themes.rose ]
	})]
} satisfies Config;
