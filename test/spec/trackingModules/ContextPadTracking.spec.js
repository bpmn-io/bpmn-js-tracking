import {
  bootstrapModeler,
  inject,
  getBpmnJS
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import { BpmnJSTracking } from 'src';
import ContextPadTracking from 'src/trackingModules/contextPad';


describe('ContextPadTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      ContextPadTracking
    ]
  }));


  describe('should subscribe', function() {

    it('contextpad.trigger', inject(function(bpmnJSTracking, contextPad, selection, elementRegistry) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');

      const event = getContextPadEvent('StartEvent_1', 'replace');

      // when
      contextPad.trigger(null, event);

      // expect
      expect(spy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('context pad trigger entry', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_1');
      selection.select(element);

      const spy = sinon.spy();
      bpmnJSTracking.on('tracking.event', spy);

      // when
      triggerContextPad('replace');

      // then
      expect(spy).to.have.been.called;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'contextPad.trigger',
        data: {
          entryId: 'replace',
          entryGroup: 'edit',
          entryTitle: 'Change type',
          selection: [ element ],
          triggerType: 'click'
        }
      });
    }));

  });

});


// helpers /////////
function triggerContextPad(entry) {
  const target = domQuery(`.djs-context-pad [data-action="${entry}"]`);

  target.click();
}

function getContextPadEvent(elementId, entryId) {

  return getBpmnJS().invoke(function(elementRegistry, selection) {
    const element = elementRegistry.get(elementId);
    selection.select(element);

    const target = domQuery(".djs-context-pad [data-action='" + entryId + "']");

    return {
      target: target,
      preventDefault: function() {},
      clientX: 100,
      clientY: 100
    };
  });
}