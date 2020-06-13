const store = new Map();

const registerModule = (moduleName, provider) => {
  let preProvider = store.get(moduleName);
  provider = preProvider ? {...preProvider, ...provider} : provider;
  store.set(moduleName, provider);
};

const unregisterModule = moduleName => {
  if (Array.isArray(moduleName)) {
    moduleName.forEach(item => unregisterModule(item));
  } else {
    store.delete(moduleName);
  }
};

const getProvide = (moduleName, provideName) => {
  const provider = store.get(moduleName);

  if (!provider || !provider[provideName]) {
    return console.warn(`[module-di] not found by ${moduleName}/${provideName}`);
  } else {
    return provider[provideName];
  }
}

export { registerModule, unregisterModule, getProvide };
