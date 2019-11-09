import {Toolbar} from './toolbar.js';
import {Item} from './item.js';

export class Application extends window.vdom.Component {
	constructor(attrs, children) {
		super(attrs, children);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}

	didCreate() {
		document.addEventListener('click', this.handleOutsideClick);
	}

	willDestroy() {
		document.removeEventListener('click', this.handleOutsideClick);
	}

	handleOutsideClick(event) {
		console.log(event.defaultPrevented);
		if (event.defaultPrevented) {
			return;
		}

		this.attrs.store.setSelectedId(undefined);
	}

	render() {
		return {
			tag: 'DIV',
			children: [
				{
					tag: Toolbar,
					attrs: {store: this.attrs.store},
					key: 'toolbar'
				},
				{
					tag: 'DIV',
					key: 'items',
					children: this.attrs.store.todos.map(todo => ({
						tag: Item,
						attrs: {
							model: todo,
							isSelected: this.attrs.store.selectedId === todo.id,
							onSelected: () => this.attrs.store.setSelectedId(todo.id),
						},
						key: todo.id,
					})),
				},
			],
		}
	}
}
