// https://prettier.io/docs/en/options.html
module.exports = {
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        tabWidth: 4,
        printWidth: 88,
        singleQuote: true,
      },
    },
    {
      files: ['*.md'],
      options: {
        // There is currently a bug that affects text alignment after the bullet
        // points in markdown
        // https://github.com/prettier/prettier/issues/5019
        tabWidth: 4,
      },
    },
    // https://github.com/NiklasPor/prettier-plugin-go-template
    {
      files: ['blog/src/layouts/**/*.html'],
      options: {
        parser: 'go-template',
        tabWidth: 4,
        printWidth: 88,
      },
    },
    {
      files: ['*.json', '*.css'],
      options: {
        tabWidth: 2,
        printWidth: 88,
      },
    },
    {
      files: ['*.js'],
      options: {
        tabWidth: 2,
        printWidth: 88,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    },
  ],
}
