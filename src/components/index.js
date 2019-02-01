import Ele from '../utils/element';

export const home = () => Ele('div', [
  'home page',
  Ele('button', { '_on:click': 'testFn' }, ['click me']),
  Ele('input', {'_model': 'testModel'})
]);

export const route1 = () => Ele('div', { 'class': 'origin', '_class': 'toggleKey?effect' }, [
  'route1 page',
  Ele('button', { '_on:click': 'toggle' }, ['ChangeBackgroundColor']),
  Ele('button', { '_on:click': 'toggleDiv' }, ['ToggleDiv']),
  Ele('div', { 'class': 'toggleElement', '_if': 'divKey' }, ['toggled DIV'])
]);

export const route2 = () => Ele('div', [
  'route2 page',
  Ele('h3', ['the list is build by _data']),
  Ele('button', { '_on:click': 'openDialog' }, ['openAddItemDialog']),
  Ele('div', { '_if': 'dialog' }, [
    Ele('input', { '_model': 'itemName' }),
    Ele('button', { '_on:click': 'addNewItem' }, ['addNewItem'])
  ]),
  Ele('ul', { '_data': 'list' }, (item, index) =>
    Ele('li', [item, Ele('span', { '_on:click': `deleteItem(${index})` }, [' X'])]))
]);

const Layout = () =>
  Ele('div', { 'class': 'content' }, [
    Ele('div', { 'class': 'slide' }, [
      Ele('p', [Ele('a', { 'href': '#/home' }, ['home'])]),
      Ele('p', [Ele('a', { 'href': '#/route1' }, ['route1'])]),
      Ele('p', [Ele('a', { 'href': '#/route2' }, ['route2'])])
    ]),
    Ele('div', { 'id': 'routerView' })
  ]);

export default Layout();