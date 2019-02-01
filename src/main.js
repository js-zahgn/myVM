import './style/reset.css';
import './style/myStyle.scss';

import Index from './components';
import Router from './utils/router';

window.onload = () => {
  document.querySelector('#root').appendChild(Index.render());
  Router.init(window);
};