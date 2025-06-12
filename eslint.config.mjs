import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.node,
  {
    rules: {
      '@typescript-eslint/max-params': 'off',
    },
  },
]
