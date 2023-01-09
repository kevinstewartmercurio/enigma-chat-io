import pkg from "../package.json";

const def = {
  development: {
    endpoint: pkg.proxy
  },
  production: {
    endpoint: window.location.hostname
  }
}

export default def;