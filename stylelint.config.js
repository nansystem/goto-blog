module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration

  // problem 「Unexpected unknown at-rule "@screen"   at-rule-no-unknown」と表示される
  // solution https://github.com/nuxt-community/tailwindcss-module/issues/263#issuecomment-806279994
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind', 'screen'],
      },
    ],
  },
}
