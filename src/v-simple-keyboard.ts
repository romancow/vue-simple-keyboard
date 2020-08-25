import 'simple-keyboard/build/css/index.css'
import Vue from 'vue'
import SimpleKeyboard from 'simple-keyboard'

const VSimpleKeyboard = Vue.extend({
	props: {
		value: { type: String, default: '' },
		options: { type: Object, default: null }
	},
	computed: {
		input: {
			get() { return this.keyboard.getInput() },
			set(input: string) { this.keyboard.setInput(input) }
		}
	},
	methods: {
		clear() { this.keyboard.clearInput() },
		onChange(value: string) { this.$emit('input', value) },
		onKeyPress(button: string) { this.$emit('keypress', button) },
		onRender() { this.$emit('render') }
	},
	watch: {
		value(value: string) { this.input = value },
		options: {
			deep: true,
			handler(options: Record<string, any>) {
				this.keyboard.setOptions(options)
			}
		}
	},
	render(h) {
		const { baseClass } = this
		return h('div', { class: baseClass ?? 'simple-keyboard' })
	},
	mounted() {
		const { options, onChange, onKeyPress, onRender } = this
		this.keyboard = new SimpleKeyboard(this.$el, { ...options, onChange, onKeyPress, onRender })
	},
	destroyed() {
		this.keyboard.destroy()
	}
})

export default VSimpleKeyboard
