import {Button} from './button.js';

export class Toolbar extends window.vdom.Component {
	constructor(attrs, children) {
		super(attrs, children);

		this.handleClick = this.handleClick.bind(this);
	}

	didCreate() {
		this.el.addEventListener('click', this.handleClick);
	}

	willDestroy() {
		this.el.removeEventListener('click', this.handleClick);
	}

	handleClick(event) {
		const ref = event.target.getAttribute('ref');
		const input = this.el.querySelector('input');

		switch (ref) {
			case 'btn-add':
				const text = input.value;

				input.value = '';
				this.attrs.store.add(text);
				break;

			case 'btn-remove':
				this.attrs.store.removeSelected();
				break;

			case 'btn-up':
				event.preventDefault();
				this.attrs.store.moveSelected('up');
				break;

			case 'btn-down':
				event.preventDefault();
				this.attrs.store.moveSelected('down');
				break;
		}
	}

	render() {
		const hasSelected = this.attrs.store.selectedId !== undefined;
		const {isFirst, isLast} = this.attrs.store.getSelectedPosition();

		return {
			tag: 'DIV',
			children: [
				{tag: 'INPUT', key: 'input'},
				{
					tag: Button,
					attrs: {ref: 'btn-add', text: 'Добавить'},
					key: 'btn-add',
				},
				(hasSelected && {
					tag: Button,
					attrs: {ref: 'btn-remove', text: 'Удалить'},
					key: 'btn-remove',
				}),
				(hasSelected && !isFirst && {
					tag: Button,
					attrs: {ref: 'btn-up', text: 'Наверх'},
					key: 'btn-up',
				}),
				(hasSelected && !isLast && {
					tag: Button,
					attrs: {ref: 'btn-down', text: 'Вниз'},
					key: 'btn-down',
				})
			].filter(child => child !== undefined)
		}
	}
}
