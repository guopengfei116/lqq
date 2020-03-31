import { merge } from "lodash";
import apiFactory from "./index";

export function api(config) {
  return function(target) {
    target._moAjaxBaseConfig_ = config;
  };
}

export function apiInject(config) {
  return function(target, key, descriptor) {
    const old = descriptor.value;

    descriptor.value = (...arg) => {
      const baseConfig =
        target._moAjaxBaseConfig_ ||
        target.constructor._moAjaxBaseConfig_ ||
        {};
      const { baseUrl = "", ...defConfig } = baseConfig;

      const megConfig = merge({}, defConfig, config);
      megConfig.url = baseUrl + megConfig.url;

      const adapConfig = [megConfig.method || "get", megConfig.url, megConfig];
      const api = apiFactory(adapConfig);

      return old.call(this, api, ...arg);
    };
  };
}
