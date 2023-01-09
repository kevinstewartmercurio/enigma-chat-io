import pkg from "../package.json";

export const def = {
  development: {
    endpoint: pkg.proxy
  },
  production: {
    endpoint: window.location.hostname
  }
}