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

    const spy = sinon.spy(function(event) {
      expect(event).to.jsonEqual({
        name: 'selection.select',
        data: {
          oldSelection: [],
          newSelection: [ newSelection ]
        },
        type: 'tracking.event'
      });
    });

    bpmnJSTracking.on('tracking.event', spy);

    // when
    selection.select(newSelection);

    // then
    expect(spy).to.have.been.calledOnce;

  }));

});