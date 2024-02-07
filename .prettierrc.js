module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@Burp/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
