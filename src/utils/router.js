import { home, route1, route2 } from '../components/index';

const Routes = [
  { path: '/', component: home() },
  { path: '/home', component: home() },
  { path: '/route1', component: route1() },
  { path: '/route2', component: route2() }
];

export class Router {
  constructor(routerList = Routes) {
    this.routes = {};
    this.routerList = routerList;
  }
  init(win) {
    this.routerList.map(route => this.routes[route.path] = route);
    this.refresh.bind(this)();
    win.addEventListener('hashchange', this.refresh.bind(this), false);
  }
  refresh() {
    const _this = this;
    const { hash } = location;
    const currentUrl = hash.slice(1) || '/';

    const routerView = document.querySelector('#routerView');
    routerView.innerHTML = '';
    routerView.appendChild(_this.routes[currentUrl].component.render());

    const tags = [...document.getElementsByClassName('routerLink')];
    tags.map(tag => {
      if (tag.getAttribute('href') == hash) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
        if (hash == '') {
          tags[0].classList.add('active');
        }
      }
    });
  }
}

export default new Router();