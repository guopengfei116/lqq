import { getProvide } from "./provider-manager";

export function builder(...arg) {
  const provide = getProvide(...arg);

  if (!provide) {
    return Promise.reject(null);
  }

  return typeof provide === "function" ? provide() : provide;
}

export { registerModule, unregisterModule } from "./provider-manager";
