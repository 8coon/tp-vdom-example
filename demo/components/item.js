
export class Item extends window.vdom.Component {
	constructor(attrs, children) {
		super(attrs, children);

		this.handleClick = this.handleClick.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	didCreate() {
		this.el.addEventListener('click', this.handleClick);

		// Подписываемся на изменение чекбокса
		const input = this.el.querySelector('INPUT');
		input.addEventListener('input', this.handleInput);
	}

	willDestroy() {
		// Не забываем отписываться от событий!
		this.el.removeEventListener('click', this.handleClick);

		const input = this.el.querySelector('INPUT');
		input.removeEventListener('input', this.handleInput);
	}

	handleClick(event) {
		event.preventDefault();
		this.attrs.onSelected(this.model);
	}

	handleInput() {
		this.attrs.model.setChecked(!this.attrs.model.checked);
	}

	render() {
		return {
			tag: 'DIV',
			attrs: {
				class: `item ${this.attrs.isSelected && 'item_selected'}`,
			},
			children: [
				{
					tag: 'INPUT',
					attrs: {
						type: 'checkbox',
						checked: this.attrs.checked,
					},
					key: 'input'
				},
				{
					tag: 'SPAN',
					children: [this.attrs.model.text],
					key: 'label'
				},
			]
		};
	}
}
