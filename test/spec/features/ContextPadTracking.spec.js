import {
  bootstrapModeler,
  inject,
  getBpmnJS
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import { BpmnJSTracking } from 'lib';
import ContextPadTracking from 'lib/features/context-pad';

import { CreateAppendAnythingModule } from 'bpmn-js-create-append-anything';

describe('ContextPadTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      ContextPadTracking,
      CreateAppendAnythingModule
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

      const spy = sinon.spy(function(event) {
        expect(event).to.eventEqual({
          name: 'contextPad.trigger',
          data: {
            entryId: 'replace',
            entryGroup: 'edit',
            entryTitle: 'Change element',
            selection: [ element ],
            triggerType: 'click'
          },
          type: 'tracking.event'
        });
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      triggerContextPad('replace');

      // then
      expect(spy).to.have.been.calledOnce;
    }));


    it('get closest "data-action"', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_1');
      selection.select(element);

      const spy = sinon.spy(function(event) {
        expect(event).to.eventEqual({
          name: 'contextPad.trigger',
          data: {
            entryId: 'append',
            entryGroup: 'model',
            entryTitle: 'Append element',
            selection: [ element ],
            triggerType: 'click'
          },
          type: 'tracking.event'
        });
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      const icon = domQuery('.djs-context-pad [data-action="append"] svg');
      dispatchClick(icon);

      // then
      expect(spy).to.have.been.calledOnce;
    }));


    it('handle broken events', inject(function(bpmnJSTracking, eventBus) {

      // when
      eventBus.fire('contextPad.trigger', {
        entry: '',
        event: {}
      });

      const spy = sinon.spy();
      bpmnJSTracking.on('tracking.event', spy);

      // then
      expect(spy).to.not.have.been.called;
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

const dispatchClick = target => {
  const ev = new PointerEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  target.dispatchEvent(ev);
};
