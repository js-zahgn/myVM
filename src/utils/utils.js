const utils = {
  // dom选择器
  $$: (s) => document.querySelector(s),

  // 对象拷贝
  copyObj: (obj) => JSON.parse(JSON.stringify(obj)),

  // 对象类型判断
  type: (obj) => Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, ''),
  isArray: (list) => utils.type(list) === 'Array',

  /** 
   * @method
   * @param {Array} list 用来查找的目标数组
   * @param {String} key 数组item的对比字段
   * @param {String} val item的对比值
   * @returns 返回与item[key]与val的item
   * @desc 模拟Array.prototype.find,兼容IE
   */
  find: (list, key, val) => {
    let res = null,
      len = list.length;
    for (var i = 0; i < len; i++) {
      if (list[i][key] == val) {
        res = {
          item: list[i],
          index: i
        };
        break;
      }
    }
    return res;
  }
};
export default utils;