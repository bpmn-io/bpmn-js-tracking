import {
  bootstrapModeler
} from 'bpmn-js/test/helper';

import { injectStyles } from '../TestHelper';

import BpmnJSTracking from '../../src/BpmnJSTracking';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'modeler';


describe('BpmnJSTracking', function() {

  const diagram = require('./simple.bpmn').default;

  injectStyles();

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking
    ]
  }));


  (singleStart ? it.only : it)('should import simple process', function() {});

});