
export class Item extends window.vdom.Component {
	constructor(attrs, children) {
		super(attrs, children);

		this.handleClick = this.handleClick.bind(this);
	}

	didCreate() {
		this.el.addEventListener('click', this.handleClick);
	}

	willDestroy() {
		// Не забываем отписываться от событий!
		this.el.removeEventListener('click', this.handleClick);
	}

	handleClick(event) {
		if (event.target !== this.el.querySelector('INPUT')) {
			event.preventDefault();
			this.attrs.onSelected(this.model);
		}
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
