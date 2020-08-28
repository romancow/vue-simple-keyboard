import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

const config = (format, file = format, plugins = []) => {
	return {
		input: 'build/index.js',
		context: 'window',
		external: ['vue'],
		output: {
			name: 'VSimpleKeyboard',
			globals: { vue: 'Vue' },
			format,
			file: `dist/vue-simple-keyboard.${file}.js`
		},
		plugins: [
			nodeResolve(),
			commonjs(),
			postcss(),
			...plugins
		]
	}
}

export default [
	config('esm'),
	config('umd'),
	config('iife', 'min', [terser()])
]
