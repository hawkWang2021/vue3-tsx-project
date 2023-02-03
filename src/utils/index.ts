// 检查对象是否为空;
export const isEmpty = (obj: object) => Object.keys(obj).length === 0;
// 数组去重
export const uniqueArr = (arr: any[]) => [...new Set(arr)];
// 反转字符串
export const reverseStr = (str: string) => str.split("").reverse().join("");
