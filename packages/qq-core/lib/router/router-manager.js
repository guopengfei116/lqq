import { toArray } from "@qq/qq-util/object";

// { moduleName: routes{Array<Route>} }
const routeStore = {};

const registerModule = (moduleName, moduleRouters) => {
  routeStore[moduleName] = toArray(moduleRouters);
};

// flat routers
const getRoutes = () =>
  Object.values(routeStore).reduce((all, moduleRouters) => {
    all.push(...moduleRouters);
    return all;
  }, []);

const getModule = moduleName => routeStore[moduleName];

export { registerModule, getRoutes, getModule };
