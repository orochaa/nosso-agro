import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.node,
  plugin.configs.jest,
  {
    rules: {
      '@typescript-eslint/max-params': 'off',
    },
  },
]
