import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import BpmnJSTracking from 'src/BpmnJSTracking';
import SelectionTracking from 'src/trackingModules/selection';


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
      const { name, data } = event;
      expect(name).to.eql('selection.select');
      expect(data.newSelection).to.eql([ newSelection ]);
      expect(data.oldSelection).to.eql([]);
    });

    bpmnJSTracking.on('tracking.event', spy);

    // when
    selection.select(newSelection);

    // then
    expect(spy).to.have.been.calledOnce;

  }));

});