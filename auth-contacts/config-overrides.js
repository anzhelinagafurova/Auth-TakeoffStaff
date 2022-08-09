module.exports = function override(config) {

    config.module.rules = [...config.module.rules, 
        {
            resolve: {
                extensions: ['.js', '.tsx']
            }
        }
      ]

    return config
}