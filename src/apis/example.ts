import request from "u@/request";

/**
 * @description xxx
 * @author xxx
 * @date 20/07/2022
 * @url /url
 * @method get
 */
export interface IqueryText {
  text: string
}
export function getXXX(params: IqueryText) {
  return request<string>({
    url: `/url`,
    method: 'get', // post Or put ...
    params
  });
}