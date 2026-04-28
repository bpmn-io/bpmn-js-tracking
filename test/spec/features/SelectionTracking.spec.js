import { expect } from 'chai';
import { spy } from 'sinon';

import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import BpmnJSTracking from 'lib/BpmnJSTracking';
import SelectionTracking from 'lib/features/selection';


describe('SelectionTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;
  let bpmnJSTracking;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      SelectionTracking
    ]
  }));

  beforeEach(function() {
    bpmnJSTracking = getBpmnJS().get('bpmnJSTracking');
  });

  beforeEach(inject(function(bpmnJSTracking) {
    bpmnJSTracking.enable();
  }));


  it('should track selection', inject(function(elementRegistry, selection) {

    // given
    const newSelection = elementRegistry.get('StartEvent_1');

    const trackSpy = spy(function(event) {
      expect(event).to.eventEqual({
        name: 'selection.select',
        data: {
          oldSelection: [],
          newSelection: [ newSelection ]
        },
        type: 'tracking.event'
      });
    });

    bpmnJSTracking.on('tracking.event', trackSpy);

    // when
    selection.select(newSelection);

    // then
    expect(trackSpy).to.have.been.calledOnce;
  }));

});