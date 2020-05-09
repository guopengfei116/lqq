import { clone } from "lodash";
import { registerHttpEngine, invadeHttpEngine, getEngine } from "./engine-manager";
import { registerModule, getApi } from "./api-manager";
import {
  beautifyData,
  setParams,
  extractQuery,
  getPayloadConfig
} from "./api/data";

/**
 * 创建api执行器
 * @return Function api executor
 * */
function executorFactory(namespace) {
  let apiConfig = namespace;

  if (typeof namespace === "string") {
    apiConfig = getApi(namespace);
  }

  const [method, url, other = {}] = apiConfig;
  const { engine, priority, request, response } = other;

  /**
   * executor
   * 用户数据会进行如下处理：
   * 1. 自动从数据中提取path参数放置到url中，比如/:id这种动态路径
   * 2. 然后重置数据属性命名风格，比如驼峰转蛇形
   * 3. 根据method和queries配置，自动判断用body还是query形式发送数据，也可能两者同时使用
   * 注：如果数据为FormData，则不会命名风格转换
   */
  return (data, config) => {
    // dynamic path
    const urlI = setParams(url, data);

    // data style
    if (typeof(FormData) === "undefined" || !(data instanceof FormData)) {
      data = clone(data);
      data = beautifyData(data, request && request.style);
    }

    // data payload
    let { queries = [] } = other;
    queries = beautifyData(queries, request && request.style);
    const queryI = extractQuery(queries, data);
    const configI = getPayloadConfig(method, data, queryI);

    // send
    const engineI = getEngine(engine);
    const result = engineI({
      method,
      url: urlI,
      ...config,
      ...configI
    });

    // data post-processing
    return result.then(rsp => {
      rsp.data = beautifyData(rsp.data, response && response.style);
      return rsp;
    });
  };
}

/**
 * 创建api执行器，但是绑定了命名空间
 * @return Function api executor
 * */
const createNamespacedHelpers = prePath => sufPath => {
  const fullPath = [prePath, sufPath].filter(Boolean).join("/");
  return executorFactory(fullPath);
};

export {
  registerModule,
  registerHttpEngine,
  invadeHttpEngine,
  getEngine as getHttpEngine,
  createNamespacedHelpers
};

export default executorFactory;
