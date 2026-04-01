const ROUTE_LOADER_START_EVENT = "trackfleetio:route-loader-start";

export const startRouteLoader = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(ROUTE_LOADER_START_EVENT));
};

export const routeLoaderEvents = {
  start: ROUTE_LOADER_START_EVENT,
} as const;
