const webpackConfig = require('../webpack.config.js')

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat(
    webpackConfig.module.rules,
  )
  storybookBaseConfig.resolve.modules = storybookBaseConfig.resolve.modules.concat(
    webpackConfig.resolve.modules,
  )

  return storybookBaseConfig
}
