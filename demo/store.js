
export class Todo {
	constructor(id, text) {
		this.id = id;
		this.text = text;
		this.checked = false;
	}

	setChecked(value) {
		this.checked = value;
		// TODO: Rerender
	}
}

export class TodoStore {
	constructor() {
		this.todos = [];
		this.selectedId = undefined;
		this.lastId = 0;
	}

	setUpdateAllCallback(updateAll) {
		this.updateAll = updateAll;
	}

	onChange() {
		if (this.updateAll) {
			this.updateAll();
		}
	}

	setSelectedId(selectedId) {
		this.selectedId = selectedId;
		this.onChange();
	}

	add(text) {
		const todo = new Todo(this.lastId++, text);
		this.todos.push(todo);
		this.onChange();
	}

	removeSelected() {
		this.todos = this.todos.filter(todo => todo.id !== this.selectedId);
		this.onChange();
	}

	findSelectedIndex() {
		return this.todos.findIndex(todo => todo.id === this.selectedId)
	}

	getSelectedPosition() {
		const index = this.findSelectedIndex();

		if (index >= 0) {
			return {
				index,
				isFirst: index === 0,
				isLast: index === this.todos.length - 1,
			};
		}

		return {}
	}

	swap(indexA, indexB) {
		const tmp = this.todos[indexA];
		this.todos[indexA] = this.todos[indexB];
		this.todos[indexB] = tmp;
	}

	moveSelected(direction) {
		const {isFirst, isLast, index} = this.getSelectedPosition();
		const isUp = direction === 'up';
		const isDown = direction === 'down';

		if (isFirst && isUp || isLast && isDown) {
			return;
		}

		if (isUp) {
			this.swap(index, index - 1);
		} else if (isDown) {
			this.swap(index, index + 1);
		}

		this.onChange();
	}
}
