module.exports = {
  extends: [
    require.resolve('eslint-config-standard')
  ],
  env: {
    node: true
  },
  rules: {
    'array-element-newline': [
      'error',
      'always'
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 1
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 1
        },
        ObjectPattern: {
          multiline: true
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 1
        }
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true
      }
    ]
  }
}
