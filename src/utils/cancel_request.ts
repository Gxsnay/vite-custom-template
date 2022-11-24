import axios, { CancelTokenSource } from 'axios';
import { hasSymbol } from './check_value';

export function createCancelToken() {
  const { CancelToken } = axios;
  return CancelToken.source();
};

interface IRequestTag {
  [key: string]: CancelTokenSource
};

class CancelRequest {
  public mode: IRequestTag = {};
  private static instance: CancelRequest;

  static getInstance(opts = {}) {
    if (!CancelRequest.instance) {
      CancelRequest.instance = new CancelRequest();
    };

    return CancelRequest.instance;
  };

  addCancelTokenTag(key: string) {
    const tokenAndCancel = createCancelToken();
    this.mode[key] = tokenAndCancel;

    return tokenAndCancel;
  };

  triggerCancelTokenFn(): void {
    Object.keys(this.mode).forEach((_key) => {
      this.mode[_key].cancel('Cancel this request!!!');
    });
  }

  removeCancelTokenTag(key: string) {
    hasSymbol ?
      (Reflect.deleteProperty(this.mode, key)) :
      (delete this.mode[key]);
  };
};

export const createCancelRequest = function() {
  return CancelRequest.getInstance();
};

/**
 * 示例：
 *  const cReqInstance = createCancelRequest();
 *  const token = cReqInstance.addCancelTokenTag( 唯一值，例：请求参数。 );
 *  // 在 request 请求过程中，「 绑定 」 token 到 cancelToken 中。
 *  return request({
      url: 'xxx',
      method: 'get',
      params,
      cancelToken: token
    })
 *  // 然后在需要「 触发 」的地方调用触发即可。
 *  cancelRequestIn.triggerCancelTokenFn();
 */
