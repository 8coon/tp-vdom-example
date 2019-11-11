import {TodoStore} from './store.js';
import {Application} from './components/application.js';

const store = new TodoStore();

store.add('Изучить JavaScript');
store.add('Сходить за хлебом');
store.add('Понять Virtual DOM');

const node = window.vdom.create({
	tag: Application,
	attrs: {store},
});

store.setUpdateAllCallback(() => {
	// Обновляем приложение по любоиу изменению стора
	window.vdom.update(node, {
		tag: Application,
		attrs: {store},
	});
});

// Вставляем приложение в DOM
document.getElementById('app-canvas').appendChild(node);
