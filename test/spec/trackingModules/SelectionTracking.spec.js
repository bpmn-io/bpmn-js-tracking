import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import BpmnJSTracking from 'src';


describe('SelectionTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;
  let bpmnJSTracking;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking
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
      expect(event.name).to.eql('diagram.select');
      expect(event.newSelection).to.eql([ newSelection ]);
      expect(event.oldSelection).to.eql([]);
    });

    bpmnJSTracking.on('tracking.event', spy);

    // when
    selection.select(newSelection);

    // then
    expect(spy).to.have.been.calledOnce;

  }));

});