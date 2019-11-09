const vdom = require('./vdom');

describe('vdom', () => {

	describe('create', () => {
		test('Создаёт одну текстовую ноду', () => {
			expect(vdom.create('It works!')).toMatchSnapshot();
		});

		test('Создаёт один элемент', () => {
			expect(vdom.create(
				{
					tag: 'DIV',
				}
			)).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя атрибутами', () => {
			expect(vdom.create(
				{
					tag: 'DIV',
					attrs: {
						style: 'background-color: red;',
						'tab-index': 0
					}
				}
			)).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя детьми', () => {
			expect(vdom.create(
				{
					tag: 'DIV',
					children: [
						{tag: 'SPAN'},
						'Some text'
					]
				}
			)).toMatchSnapshot();
		});
	});

});
