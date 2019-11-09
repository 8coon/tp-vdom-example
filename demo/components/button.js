
export class Button extends window.vdom.Component {
	render() {
		return {
			tag: 'BUTTON',
			attrs: {type: 'button', ref: this.attrs.ref},
			children: [this.attrs.text],
			key: 'btn-add',
		}
	}
}
