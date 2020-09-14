import 'simple-keyboard/build/css/index.css'
import Vue from 'vue'
import SimpleKeyboard from 'simple-keyboard'

declare module 'simple-keyboard' {
	export default interface SimpleKeyboard {
		replaceInput(inputs: { [name: string]: string }): void
	}
}

namespace ObjUtils {
	export function keys<T extends Object, K extends keyof T>(obj: T) {
		return Object.keys(obj) as K[]
	}

	export function map<T extends Object, K extends keyof T>(obj: T, mapFn: (val: T[K], key: K, obj: T) => any) {
		return ObjUtils.keys<T, K>(obj).reduce((mapped, key) => {
			mapped[key as K] = mapFn(obj[key], key, obj)
			return mapped
		}, {} as Record<K, any>)
	}

	export function filter<T, K extends keyof T>(obj: T, filterFn: (val: T[K], key: K, obj: T) => boolean) {
		return ObjUtils.keys<T, K>(obj).reduce((filtered, key) => {
			const val = obj[key]
			if (filterFn(val, key as K, obj))
				filtered[key] = val
			return filtered
		}, {} as Partial<T>)
	}

	export function select<T, K extends keyof T>(obj: T, keys: K[]) {
		return keys.reduce((selected, key) => {
			selected[key] = obj[key]
			return selected
		}, {} as Record<K, T[K]>)
	}
}

namespace SimpleKeyboardOptions {
	export const Map = {
		layout: Object,
		layoutName: String,
		display: Object,
		mergeDisplay: Boolean,
		theme: String,
		buttonAttributes: Array,
		buttonTheme: Array,
		debug: Boolean,
		useMouseEvents: Boolean,
		useTouchEvents: Boolean,
		autoUseTouchEvents: Boolean,
		preventMouseDownDefault: Boolean,
		stopMouseDownPropagation: Boolean,
		disableCaretPositioning: Boolean,
		useButtonTag: Boolean,
		newLineOnEnter: Boolean,
		tabCharOnTab: Boolean,
		inputName: String,
		maxLength: [Number, Object],
		inputPattern: [RegExp, Object],
		physicalKeyboardHighlight: Boolean,
		disableRowButtonContainers: Boolean,
		disableButtonHold: Boolean, 
		syncInstanceInputs: Boolean,
		physicalKeyboardHighlightTextColor: String,
		physicalKeyboardHighlightBgColor: String,
		baseClass: String
	}

	export const Keys = ObjUtils.keys(Map)

	export const Props = ObjUtils.map(Map, 
		(val) => ({ type: val, default: null })
	)
}

namespace SimpleKeyboardEvents {
	export const Map = {
		onChange: 'input',
		onKeyPress: 'keypress',
		onRender: 'render',
		beforeFirstRender: 'beforerender:first',
		beforeRender: 'beforerender',
		onInit: 'init',
		onKeyReleased: 'keyreleased',
		onChangeAll: 'update:all'
	}

	export const Methods = ObjUtils.map(Map,
		(event) => function(this: Vue,...args: any[]) {
			this.$emit(event, ...args)
		}
	)

	export type Keys = keyof typeof Map
}

const vSimpleKeyboard = Vue.extend({
	data: function() {
		return { keyboard: <unknown>undefined }
	} as (() => { keyboard: SimpleKeyboard }),
	props: {
		value: { type: String, default: '' },
		all: { type: Object, default: null },
		...SimpleKeyboardOptions.Props
	},
	computed: {
		options() {
			const keys = SimpleKeyboardOptions.Keys.filter(key => this[key] != null)
			return ObjUtils.select(this, keys)
		},
		callbacks(this: Vue) {
			const listeners = this.$listeners
			return ObjUtils.map(SimpleKeyboardEvents.Methods, (fn, event) =>
				listeners[event] ? fn : undefined
			)
		}
	},
	methods: {
		clear() { this.keyboard.clearInput() }
	},
	watch: {
		value(value: string) {
			this.keyboard.setInput(value)
		},
		all: {
			deep: true,
			handler(values: { [name: string]: string }) {
				this.keyboard.replaceInput(values)
			}
		},
		options: {
			deep: true,
			handler(options: Record<string, any>) {
				this.keyboard.setOptions(options)
			}
		},
		callbacks: {
			deep: true,
			handler(callbacks: Record<string, any>) {
				this.keyboard.setOptions(callbacks)
			}
		}
	},
	render(h) {
		return h('div', { class: this.baseClass ?? 'simple-keyboard' })
	},
	mounted() {
		const { options, callbacks } = this
		this.keyboard = new SimpleKeyboard(this.$el as HTMLDivElement, { ...options as Object, ...callbacks })
	},
	destroyed() {
		this.keyboard.destroy()
	}
})

export default vSimpleKeyboard
