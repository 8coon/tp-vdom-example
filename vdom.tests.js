const vdom = require('./vdom');

describe('vdom', () => {

	describe('create', () => {
		test('Создаёт одну текстовую ноду', () => {
			expect(vdom.create('It works!')).toMatchSnapshot();
		});

		test('Создаёт один элемент', () => {
			expect(vdom.create({tag: 'DIV'})).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя атрибутами', () => {
			expect(vdom.create({
				tag: 'DIV',
				attrs: {
					style: 'background-color: red;',
					'tab-index': 0
				}
			})).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя детьми', () => {
			expect(vdom.create({
				tag: 'DIV',
				children: [
					{tag: 'SPAN'},
					'Some text'
				]
			})).toMatchSnapshot();
		});
	});

	describe('update', () => {
		describe('attrs', () => {
			test('Обновляет атрибуты 2 -> 2', () => {
				const node = vdom.create({
					tag: 'DIV',
					attrs: {
						style: 'background-color: red;',
						'tab-index': 0
					}
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					attrs: {
						style: 'background-color: black;',
						'tab-index': 2
					}
				})).toMatchSnapshot();
			});

			test('Обновляет атрибуты 2 -> 1', () => {
				const node = vdom.create({
					tag: 'DIV',
					attrs: {
						style: 'background-color: red;',
						'tab-index': 0
					}
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					attrs: {
						style: 'background-color: black;'
					}
				})).toMatchSnapshot();
			});

			test('Обновляет атрибуты 1 -> 2', () => {
				const node = vdom.create({
					tag: 'DIV',
					attrs: {
						'tab-index': 0
					}
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					attrs: {
						style: 'background-color: black;',
						'tab-index': 2
					}
				})).toMatchSnapshot();
			});

			test('Обновляет атрибуты 2 -> 0', () => {
				const node = vdom.create({
					tag: 'DIV',
					attrs: {
						style: 'background-color: red;',
						'tab-index': 0
					}
				});

				expect(vdom.update(node, {
					tag: 'DIV',
				})).toMatchSnapshot();
			});

			test('Обновляет атрибуты 0 -> 2', () => {
				const node = vdom.create({
					tag: 'DIV',
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					attrs: {
						style: 'background-color: black;',
						'tab-index': 2
					}
				})).toMatchSnapshot();
			});
		});

		describe('children', () => {
			test('Обновляет детей 1 -> 1', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 1 -> 1 разные типы', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						'Some text',
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 1 -> 1 разные ключи', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						{tag: 'B', key: 'B'},
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 2 -> 2', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
						'Some text'
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						{tag: 'SPAN', attrs: {disabled: 'disabled'}, key: 'A'},
						'Some text updated'
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 2 -> 2 разные типы', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'SPAN', key: 'A'},
						'Some text'
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						'Some text updated',
						{tag: 'SPAN', attrs: {disabled: 'disabled'}, key: 'A'},
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 2 -> 2 разные ключи', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'B', attrs: {A: 'A'}, key: 'A'},
						{tag: 'I', attrs: {B: 'B'}, key: 'B'},
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						{tag: 'B', attrs: {B: 'B'}, key: 'C'},
						{tag: 'I', attrs: {A: 'A'}, key: 'D'},
					]
				})).toMatchSnapshot();
			});

			test('Обновляет детей 2 -> 0', () => {
				const node = vdom.create({
					tag: 'DIV',
					children: [
						{tag: 'B', attrs: {A: 'A'}, key: 'A'},
						{tag: 'I', attrs: {B: 'B'}, key: 'B'},
					]
				});

				expect(vdom.update(node, {
					tag: 'DIV'
				})).toMatchSnapshot();
			});

			test('Обновляет детей 0 -> 2', () => {
				const node = vdom.create({
					tag: 'DIV'
				});

				expect(vdom.update(node, {
					tag: 'DIV',
					children: [
						{tag: 'B', attrs: {A: 'A'}, key: 'A'},
						{tag: 'I', attrs: {B: 'B'}, key: 'B'},
					]
				})).toMatchSnapshot();
			});
		});
	});

	describe('components', () => {
		function createLoggingComponentClass(log = [], prefix = '') {

			class LoggingComponent extends vdom.Component {
				didCreate() {
					super.didCreate();
					log.push(prefix + 'didCreate');
				}
				willUpdate(attrs, children) {
					super.willUpdate(attrs, children);
					log.push(prefix + 'willUpdate');
				}
				didUpdate() {
					super.didUpdate();
					log.push(prefix + 'didUpdate');
				}
				willDestroy() {
					super.willDestroy();
					log.push(prefix + 'willDestroy');
				}
			}

			return [LoggingComponent, log];
		}

		test('Отображает компонент', () => {
			const [LoggingComponent, log] = createLoggingComponentClass();

			class Test extends LoggingComponent {
				render() {
					return {tag: 'div'}
				}
			}

			const node = vdom.create({tag: Test});
			expect(node).toMatchSnapshot();

			vdom.destroy(node);
			expect(log).toMatchSnapshot();
		});

		test('Обновляет компонент с атрибутом', () => {
			const [LoggingComponent, log] = createLoggingComponentClass();

			class Test extends LoggingComponent {
				render() {
					return {
						tag: 'div',
						children: [this.attrs.text]
					}
				}
			}

			const node = vdom.create({tag: Test, attrs: {text: 'Some text'}});
			expect(node).toMatchSnapshot();

			vdom.update(node, {attrs: {text: 'Some text updated'}});
			expect(node).toMatchSnapshot();

			vdom.destroy(node);
			expect(log).toMatchSnapshot();
		});

		test('Обновляет вложенные компоненты', () => {
			const [LoggingParent, log] = createLoggingComponentClass();
			const [LoggingChild] = createLoggingComponentClass(log, 'child ');

			class Child extends LoggingChild {
				render() {
					return {
						tag: 'span',
						children: [this.attrs.text]
					}
				}
			}

			class Parent extends LoggingParent {
				render() {
					return {
						tag: 'div',
						children: [{
							tag: Child,
							attrs: {text: `Enough of ${this.attrs.text}`},
							key: `child-key-${this.attrs.key}`
						}]
					}
				}
			}

			const node = vdom.create({
				tag: Parent,
				attrs: {text: 'Some text', key: '1'}
			});
			expect(node).toMatchSnapshot();

			vdom.update(node, {
				tag: Parent,
				attrs: {text: 'Some text updated', key: '1'}
			});
			expect(node).toMatchSnapshot();

			vdom.update(node, {
				tag: Parent,
				attrs: {text: 'Some text other key', key: '2'}
			});
			expect(node).toMatchSnapshot();

			vdom.destroy(node);
			expect(log).toMatchSnapshot();
		});
	});

});
