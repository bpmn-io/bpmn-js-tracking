export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

import semver from 'semver';


export function injectStyles() {

  insertCSS(
    'diagram.css',
    require('bpmn-js/dist/assets/diagram-js.css').default
  );

  if (bpmnJsSatisfies('>=9')) {
    insertCSS(
      'bpmn-js.css',
      require('bpmn-js/dist/assets/bpmn-js.css').default
    );
  }

  insertCSS(
    'bpmn-font.css',
    require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css').default
  );
}

/**
 * Execute test only if currently installed bpmn-js is of given version.
 *
 * @param {string} versionRange
 * @param {boolean} only
 */
export function withBpmnJs(versionRange, only = false) {
  if (bpmnJsSatisfies(versionRange)) {
    return only ? it.only : it;
  } else {
    return it.skip;
  }
}

function bpmnJsSatisfies(versionRange) {
  const bpmnJsVersion = require('bpmn-js/package.json').version;

  return semver.satisfies(bpmnJsVersion, versionRange, { includePrerelease: true });
}