
module.exports = {
    configureWebpack: {
      devtool: "source-map"
    },
    publicPath: process.env.NODE_ENV === "production" ? "/Covid-19/" : "/"
  };