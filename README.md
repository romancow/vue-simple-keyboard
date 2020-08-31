# vue-simple-keyboard
A virtual keyboard Vue component using [simple-keyboard](https://github.com/hodgef/simple-keyboard)

## Properties

<dl>
	<dt>value</dt>
	<dd>Sets the simple-keyboard instance's input value. More <a href="https://hodgef.com/simple-keyboard/documentation/methods/setinput/">here</a></dd>
	<dt>all</dt>
	<dd>Replaces the sinple-keyboard instance's entire internal input object. More <a href="https://hodgef.com/simple-keyboard/documentation/methods/replaceinput/">here</a></dd>
<dl>

### simple-keyboard Options

The following simple-keyboard options (most of them) are implemented as Vue component properties. More specifics on them can be found [here](https://hodgef.com/simple-keyboard/documentation/options/).

- layout
- layoutName
- display
- mergeDisplay
- theme
- buttonAttributes
- buttonTheme
- debug
- useMouseEvents
- useTouchEvents
- autoUseTouchEvents
- preventMouseDownDefault
- stopMouseDownPropagation
- disableCaretPositioning
- useButtonTag
- newLineOnEnter
- tabCharOnTab
- inputName
- maxLength
- inputPattern
- physicalKeyboardHighlight
- disableRowButtonContainers
- disableButtonHold
- syncInstanceInputs
- physicalKeyboardHighlightTextColor
- physicalKeyboardHighlightBgColor
- baseClass

## Events

simple-keyboard callback options are implemented as Vue component events, with names that may differ slightly from their originals to fit more with Vue conventions. Check put the [simple-keyboard options](https://hodgef.com/simple-keyboard/documentation/options/) for more info on the callbacks.

<dl>
	<dt>input</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/onchange/"><code>onChange</code></a> callback</dd>
	<dt>keypress</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/onkeypress/"><code>onKeyPress</code></a> callback</dd>
	<dt>render</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/onrender/"><code>onRender</code></a> callback</dd>
	<dt>beforerender</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/beforerender/"><code>beforeRender</code></a> callback</dd>
	<dt>beforerender:first</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/beforefirstrender/"><code>beforeFirstRender</code></a> callback</dd>
	<dt>init</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/oninit/"><code>onInit</code></a> callback</dd>
	<dt>keyreleased</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/onkeyreleased/"><code>onKeyReleased</code></a> callback</dd>
	<dt>update:all</dt>
	<dd>Equivalent to simple-keyboard's <a href="https://hodgef.com/simple-keyboard/documentation/options/onchangeall/"><code>onChangeAll</code></a> callback</dd>
<dl>
