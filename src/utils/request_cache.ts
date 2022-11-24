import { hasSymbol } from './check_value';

interface ICacheProp {
  [key: string]: any
};

class RequestCache {
  public cacheMap: ICacheProp = {};
  private static instance: RequestCache;

  constructor(
    public maxSize: number = 10,
    public count: number = 0,
  ) {};

  static getInstance(maxSize?: number): RequestCache {
    if (!RequestCache.instance) {
      RequestCache.instance = new RequestCache(maxSize);
    }
    return RequestCache.instance;
  };

  addItem(key: unknown, value: unknown): void {
    if (key === null) return;
    if (typeof key === 'object') key = JSON.stringify(key);

    this.cacheMap[<string>key] = {
      value,
      time: Date.now()
    };
    this.count++;

    if (this.count > this.maxSize) {
      let min = Infinity, minKey = null;
      for (let key in this.cacheMap) {
        let item = this.cacheMap[key];
        if (item.time < min) {
          min = item.time;
          minKey = key;
        }
      }
      this.remove(minKey);
      this.count--;
    }
  };

  get(key: unknown) {
    typeof key === 'object' && (key = JSON.stringify(key));
    let item = this.cacheMap[<string>key];
    if (!item) return null;
    item && (
      item.time = Date.now()
    );
    return item.value;
  };

  remove(key?: unknown): boolean | null {
    if (key === undefined) {
      this.cacheMap = {};
      return null
    } else {
      return (
        hasSymbol ? 
          Reflect.deleteProperty(this.cacheMap, <string>key) :
          delete this.cacheMap[<string>key]
      );
    }
  };
};

export const createReqCache = function() {
  return RequestCache.getInstance();
};

export default createReqCache();
