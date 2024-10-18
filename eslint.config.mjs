// eslint.config.js
import js from '@eslint/js';
import perfectionistAlphabetical from 'eslint-plugin-perfectionist/configs/recommended-alphabetical';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
	perfectionistAlphabetical,
	tailwindcss,
	js.configs.recommended,
	{
		plugins: {
			perfectionist: 'eslint-plugin-perfectionist',
			tailwindcss: 'eslint-plugin-tailwindcss',
		},
		rules: {
			'accessor-pairs': 'error',
			'dot-notation': 'error',
			eqeqeq: 'error',
			'no-await-in-loop': 'error',
			'no-constructor-return': 'error',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-useless-return': 'error',
			'no-var': 'error',
			'sort-imports': 'error',
		},
	},
];
