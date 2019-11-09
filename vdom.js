
function create(vnode) {
	// Если создаём текстовый узел
	if (typeof vnode === 'string') {
		return document.createTextNode(vnode);
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

	node._vnode = vnode;
	return node;
}

function update() {

}

module.exports = {
	create,
	update,
};
