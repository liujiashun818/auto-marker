/**
 * 字符串首字母大写
 * @param str
 * @returns {string}
 */
function firstLetterUpper(str) {
  return str[0].toUpperCase() + str.substr(1);
}

/**
 * 删除字符串尾指定的字符串
 * @param str
 * @param tailStr
 * @returns {string}
 */
export function strDeleteTailStr(str, tailStr) {
  let pos = str.lastIndexOf(tailStr);
  return str.length === tailStr.length + pos ? str.substr(0, pos) : str;
}

/**
 * 删除字符串尾指定的字符串
 * @param str
 * @param tailStrs
 * @param casecade
 * @returns {*}
 */
export function strDeleteTailStrs(str, tailStrs = [], casecade = false) {
  for (let tailStr of tailStrs) {
    let pos = str.lastIndexOf(tailStr);
    if (str.length === tailStr.length + pos && !casecade) {
      return str.substr(0, pos);
    }
  }
  return str;
}

const StringUtil = {
  firstLetterUpper,
  strDeleteTailStr,
  strDeleteTailStrs,
};

export default StringUtil;
