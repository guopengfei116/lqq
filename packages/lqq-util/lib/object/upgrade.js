import { isNil, has } from "lodash";

// 有副作用的原对象增强

export const overwrite = (target, ...sources) => {
  if (!target || typeof target !== "object") {
    console.error(`第一个参数类型错误: ${target}`);
    return target;
  }

  sources.forEach(source => {
    for (let key in source) {
      if (!isNil(source[key]) && has(target, key)) {
        target[key] = source[key];
      }
    }
  });

  return target;
};

export const overwriteLikeTrue = (target, ...sources) => {
  if (!target || typeof target !== "object") {
    console.error(`第一个参数类型错误: ${target}`);
    return target;
  }

  sources.forEach(source => {
    for (let key in source) {
      if (source[key] && has(target, key)) {
        target[key] = source[key];
      }
    }
  });

  return target;
};

export const overwriteLikeFalse = (target, ...sources) => {
  if (!target || typeof target !== "object") {
    console.error(`第一个参数类型错误: ${target}`);
    return target;
  }

  sources.forEach(source => {
    for (let key in source) {
      if (!source[key] && has(target, key)) {
        target[key] = source[key];
      }
    }
  });

  return target;
};

export const overwriteAll = (target, ...sources) => {
  if (!target || typeof target !== "object") {
    console.error(`第一个参数类型错误: ${target}`);
    return target;
  }

  sources.forEach(source => {
    for (let key in source) {
      if (has(target, key)) {
        target[key] = source[key];
      }
    }
  });

  return target;
};
