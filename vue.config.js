export const devServer = {
  proxy: {
    "/user": {
      target: "http://localhost:3011"
    }
  }
};