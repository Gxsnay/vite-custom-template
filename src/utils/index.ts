// 随机字符串池
const randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
// 生成随机字符串
export const randomString = (length = 10, characters: string | string[] = randomCharacters) => {
  if (typeof characters === 'string') {
    characters = characters.split('');
  }
  let string = '';
  for (let i = 0; i < length; i++) {
    string += characters[Math.floor(Math.random() * length)];
  }
  return string;
};

let idIndex = 0;
// 生成唯一字符串，带顺序
export const idRandomString: () => string = () => randomString() + idIndex++;

export const colorRandom: string[] = [
  'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple',
  '#f50', '#2db7f5', '#87d068', '#108ee9'
];
export const randomNum = (num: number) => {
  return Math.floor(Math.random() * num)
};

/**
 * 小数转换百分比
 */
export const ChangeDecimalToPercentage = (
  num: number,
  digit: number,
  opts = {
    rounding: false,
    needSymbol: true
  }
) => {
  if (num === 1) return '100%';
  let decimal: string | number = num * 100;
  if (digit) {
    if (opts.rounding) {
      decimal = parseFloat(decimal as unknown as string).toFixed(digit);
    } else {
      decimal = parseFloat(decimal as unknown as string).toFixed(digit + 1);
      decimal = decimal.substring(0, decimal.length - 1);
    }
  }

  return opts.needSymbol ? `${decimal}%` : decimal;
};