
class Factory {
  constructor() {
    this.state = {
      testModel: 'initial Message',
      toggleKey: false,
      divKey: false,
      dialog: false,
      itemName: '',
      list: ['item1', 'item2', 'item3']
    };
    // Element子节点渲染函数store
    this.childrenRenderFn = {};
  }

  /// 子节点渲染函数
  _childrenRender(data, parent, key) {
    parent.innerHTML = '';
    // 获取对应的函数
    const renderFn = this.childrenRenderFn[key];
    (data || []).map(d => parent.appendChild(renderFn(d).render()));
  }

  // 修改对象默认行为
  _defineProperty(data, key, cb, dom) {
    let dataVal = data[key];
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        if (dom && dom.nodeName == ('INPUT' || 'TEXTAREA')) {
          return dom.value;
        }
        return dataVal;
      },
      set: function (newVal) {
        dataVal = newVal;
        cb(newVal);
      }
    });
  }

  // 初始化自定义属性
  initialProps(dom) {
    const _this = this;
    // 节点有_if属性时
    if (dom.hasAttribute('_if')) {
      const ifKey = dom.getAttribute('_if');
      dom.removeAttribute('_if');

      // 创建注释节点
      const commentNode = document.createComment(`start-${ifKey}-end`);
      // 保存真实节点
      const realNode = dom;
      let dataIf = _this.state[ifKey];
      if (!dataIf) {
        dom = commentNode;
      }
      // 根据新值切换真实节点和注释节点
      _this._defineProperty(_this.state, ifKey, (newVal) => {
        if (newVal) {
          dom.parentNode.replaceChild(realNode, commentNode);
        } else {
          realNode.parentNode.replaceChild(commentNode, realNode);
        }
      });
      // 注释节点
      if (dom.nodeType == 8) {
        return dom;
      }
    }

    // 节点有_class属性时
    if (dom.hasAttribute('_class')) {
      const cName = dom.getAttribute('_class');
      dom.removeAttribute('_class');
      // _class 固定格式 className ? key
      if (cName.indexOf('?') < 0) {
        throw new Error('_class must bind a defined data, like "className?key"');
      }
      const cArr = cName.split('?');
      let classKey = _this.state[cArr[0]];
      if (classKey) {
        dom.classList.add(cArr[1]);
      }
      _this._defineProperty(_this.state, cArr[0], (newVal) => {
        if (newVal) {
          dom.classList.add(cArr[1]);
        } else {
          dom.classList.remove(cArr[1]);
        }
      });
    }

    // 节点有_model属性时
    if (dom.hasAttribute('_model')) {
      const model = dom.getAttribute('_model');
      dom.removeAttribute('_model');
      dom.value = _this.state[model];
      // 将data与dom输入值绑定
      _this._defineProperty(_this.state, model, newVal => dom.value = newVal, dom);
    }

    // 节点有_data属性时
    if (dom.hasAttribute('_data')) {
      const vData = dom.getAttribute('_data');
      dom.removeAttribute('_data');

      let dataBindData = _this.state[vData];

      // 数据变化时根据子节点渲染函数重新渲染子节点
      _this._childrenRender(dataBindData, dom, vData);

      _this._defineProperty(_this.state, vData,
        newVal => _this._childrenRender(newVal, dom, vData));
    }

    // 路由节点
    if (dom.hasAttribute('href')) {
      dom.classList.add('routerLink');
    }
    return dom;
  }
  
  // 事件监听
  eventListener(dom, eventType, eventName) {
    const _this = this;
    const event = eventType.split('_on:')[1];
    if (eventName.indexOf('(') > -1) {
      const arg = eventName.split('('),
        args = arg[1].split(')')[0].split(',');
      dom.addEventListener(event, e => _this[arg[0]].call(_this, e, ...args));
    } else {
      dom.addEventListener(event, e => _this[eventName].call(_this, e));
    }
  }

  testFn() {
    console.log(this.state.testModel);
  }
  toggle() {
    this.state.toggleKey = !this.state.toggleKey;
  }
  toggleDiv() {
    this.state.divKey = !this.state.divKey;
  }
  openDialog() {
    this.state.dialog = true;
    this.state.itemName = '';
  }
  addNewItem() {
    this.state.list = [...this.state.list, this.state.itemName];
    this.state.dialog = false;
  }
  deleteItem(index) {
    this.state.list.splice(index, 1);
    this.state.list = [...this.state.list];
  }
}

export default new Factory();