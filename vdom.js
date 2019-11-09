
class Component {
	constructor(attrs, children) {
		this.update(attrs, children);
	}

	update(attrs, children) {
		this.attrs = attrs;
		this.children = children;
	}
}

function create(vnode) {
	// Если создаём текстовый узел
	if (typeof vnode === 'string') {
		return document.createTextNode(vnode);
	}

	// Если создаём компонент
	if (typeof vnode.tag === 'function') {
		// Создаём инстанс компонента
		vnode._instance = new vnode.tag(vnode.attrs, vnode.children);
		// Выполняем его шаблон
		const componentVnode = vnode._instance.render();

		// Создаём DOM по шаблону
		const node = create(componentVnode);

		// Сохраняем шаблон компонента для эффективного обновления
		node._originalVnode = node._vnode;
		// Записываем vdom инстанса компонента
		node._vnode = vnode;
		node._vnodeKey = vnode.key;

		return node;
	}

	const node = document.createElement(vnode.tag);

	// Добавляем атрибуты
	if (vnode.attrs) {
		for (const [name, value] of Object.entries(vnode.attrs)) {
			node.setAttribute(name, value);
		}
	}

	// Создаём детей
	if (vnode.children) {
		for (const child of vnode.children) {
			node.appendChild(create(child));
		}
	}

	// Связываем виртуальный и реальный DOM
	node._vnode = vnode;
	// Переносим ключ для оптимизации сравнения при обновлении родителя
	node._vnodeKey = vnode.key;

	return node;
}

function updateAttrs(node, prevAttrs, attrs) {
	// Задаём новые значения атрибутов
	if (attrs) {
		for (const [name, value] of Object.entries(attrs)) {
			node.setAttribute(name, value);
		}
	}

	// Удаляем старые атрибуты, которых не встретилось в новых
	if (prevAttrs) {
		for (const name of Object.keys(prevAttrs)) {
			if (!attrs || !attrs.hasOwnProperty(name)) {
				node.removeAttribute(name);
			}
		}
	}
}

function updateChildren(node, prevChildren, children) {
	const childLength = children ? children.length : 0;

	for (let i = 0; i < childLength; i++) {
		const prevVchild = prevChildren && prevChildren[i];
		const vchild = children[i];

		const fromString = typeof prevVchild === 'string';
		const toString = typeof vchild === 'string';

		if (fromString && toString) {
			// Если старый и новый элемент -- строки
			// Внимание! .childNodes, не .children!
			node.childNodes[i].textContent = vchild;
		} else if (
			!fromString &&
			!toString &&
			prevVchild &&
			prevVchild.key === vchild.key
		) {
			// Ключи совпадают -- можем обновить оптимально
			update(node.childNodes[i], vchild);
		} else {
			// Удаляем старую ноду
			if (prevVchild) {
				destroy(prevVchild);
			}
			// Если строка превращается в элемент или наоборот
			// Либо у элементов не совпали ключи
			// Вставляем новую ноду перед текущей, старая нода при этом "всптывает" в конец
			node.insertBefore(create(vchild), node.childNodes[i]);
		}
	}

	const curChildLength = node.childNodes.length;

	// Удаляем "лишние" узлы
	for (let i = childLength; i < curChildLength; i++) {
		node.removeChild(node.childNodes[childLength]);
	}
}

function update(node, vnode) {
	let prevVnode = node._vnode;
	let resultVnode = vnode;

	// Если обновляем компонент
	if (typeof prevVnode.tag === 'function') {
		// Прокидываем компоненту новые атрибуты и дочерние элементы, пришедшие сверху
		prevVnode._instance.update(vnode.attrs, vnode.children);
		// Выполняем шаблон компонента с новыми атрибутами
		vnode = prevVnode._instance.render();
		// Переносим инстанс со старой ноды на новую
		resultVnode._instance = prevVnode._instance;
		// Дальше сравнивать будет именно со старым vdom шаблона, а не компонента
		prevVnode = node._originalVnode;
	}

	updateAttrs(node, prevVnode.attrs, vnode.attrs);
	updateChildren(node, prevVnode.children, vnode.children);

	// Обновлем связь с virtual DOM
	node._vnode = resultVnode;

	return node;
}

function destroy(node) {
	const vnode = node._vnode;

	if (vnode && vnode.children) {
		for (const child of vnode.children) {
			destroy(child);
		}
	}
}

module.exports = {
	Component,
	create,
	update,
	destroy,
};
