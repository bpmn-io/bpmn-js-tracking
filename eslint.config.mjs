import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  build: [
    '*.js',
    '*.mjs'
  ],
  test: [
    'test/**/*.js'
  ],
  ignored: [
    'dist'
  ]
};

export default [
  {
    'ignores': files.ignored
  },
  ...bpmnIoPlugin.configs.browser.map(config => {

    return {
      ...config,
      ignores: files.build
    };
  }),
  ...bpmnIoPlugin.configs.node.map(config => {

    return {
      ...config,
      files: files.build
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test
    };
  }),
  {
    files: files.test,
    languageOptions: {
      globals: {
        require: 'readonly',
        sinon: 'readonly',
        global: 'readonly'
      }
    }
  }
];