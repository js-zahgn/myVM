import utils from './utils';
import factory from './factory';

/**
 * @class
 * @param {string} tagName 节点名称 例如：'div','span'
 * @param {object} props 属性 例如：{class:'className','_click':'fnName'}  
 * @param {Array} children 子节点
 * @desc 模拟dom节点，返回一个真实dom节点
 * @example 
 * new Element('div',{'class':'className','_click':'fnName'},[new Element('span'),'text'])
 *     编译结果 <div class="className" onClick="fnName"><span>text</span></div>
 */
export class Element {
  constructor(tagName, props, children) {
    // 如果没有第三个参数，第二个参数是一个数组，说明第二个参数传的是子节点
    if (!children && utils.isArray(props)) {
      children = props;
      props = {};
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
  }

  render() {
    let { tagName, props, children } = this;
    let doc = document;
    const el = doc.createElement(tagName);
    // 遍历属性
    Object.keys(props).map(propName => {
      let propVal = props[propName];
      if (propName == '_data') {
        // 该节点有_data属性，那么它的子节点必须是函数用来渲染子节点
        if (utils.type(children) !== 'Function') {
          throw new Error(`Children must be a render function when the Element has 
          "_data" property!`);
        }
        // 将子节点渲染函数存入工厂类
        factory.childrenRenderFn[propVal] = children;
        children = [];
      }

      // 监听事件
      if (propName.indexOf('_on') < 0) {
        el.setAttribute(propName, propVal);
      } else {
        factory.eventListener(el, propName, propVal);
      } 
    });
    children.forEach(child => {
      // 遍历子节点，如果是Element就递归继续构建，否则就创建文本节点
      let childEle;

      if (child instanceof Element) childEle = child.render();
      if (utils.type(child) === 'String') {
        // if (child.match(/\{\{(.+)\}\}/g)) {
        //   child = factory.listenText(child.replace(/\{?\}?/g, ''));
        // }
        childEle = document.createTextNode(child);
      }
      el.appendChild(childEle);
    });
    // 简单解析自定义属性
    return factory.initialProps(el);
  }
}

export default (tagName, props, children) => new Element(tagName, props, children);