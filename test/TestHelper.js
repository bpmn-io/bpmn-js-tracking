export * from 'bpmn-js/test/helper';

import {
  insertCSS,
  bootstrapBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import Modeler from 'bpmn-js/lib/Modeler';

import semver from 'semver';

import TestContainer from 'mocha-test-container-support';

let PROPERTIES_PANEL_CONTAINER;

global.chai.use(function(chai, utils) {

  utils.addMethod(chai.Assertion.prototype, 'jsonEqual', function(comparison) {

    var actual = JSON.stringify(this._obj);
    var expected = JSON.stringify(comparison);

    this.assert(
      actual == expected,
      'expected #{this} to deep equal #{act}',
      'expected #{this} not to deep equal #{act}',
      comparison, // expected
      this._obj, // actual
      true // show diff
    );
  });
});

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

  insertCSS(
    'test.css',
    require('./test.css').default
  );

  insertCSS(
    'properties-panel.css',
    require('@bpmn-io/properties-panel/dist/assets/properties-panel.css').default
  );

  insertCSS(
    'element-templates.css',
    require('bpmn-js-element-templates/dist/assets/element-templates.css').default
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

export function bootstrapPropertiesPanel(diagram, options, locals) {
  return async function() {
    const container = TestContainer.get(this);

    injectStyles();

    // (1) create modeler + import diagram
    const createModeler = bootstrapBpmnJS(Modeler, diagram, options, locals);

    await createModeler.call(this);

    // (2) clean-up properties panel
    clearPropertiesPanelContainer();

    // (3) attach properties panel
    const attachPropertiesPanel = inject(async function(propertiesPanel) {
      PROPERTIES_PANEL_CONTAINER = document.createElement('div');
      PROPERTIES_PANEL_CONTAINER.classList.add('properties-container');

      container.appendChild(PROPERTIES_PANEL_CONTAINER);

      return propertiesPanel.attachTo(PROPERTIES_PANEL_CONTAINER);
    });

    await whenStable(50);
    await attachPropertiesPanel();
    return container;
  };
}


export function clearPropertiesPanelContainer() {
  if (PROPERTIES_PANEL_CONTAINER) {
    PROPERTIES_PANEL_CONTAINER.remove();
  }
}

export function whenStable(timeout = 50) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export async function expectEventually(fn) {
  const nextFrame = () => new Promise(resolve => {
    requestAnimationFrame(resolve);
  });

  let e, i = 10;
  do {
    try {
      await nextFrame();
      await fn();
      return;
    } catch (error) {
      e = error;
    }
  } while (i--);

  throw e;
}
