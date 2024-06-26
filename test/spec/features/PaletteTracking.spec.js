import {
  bootstrapModeler,
  inject
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';


import { BpmnJSTracking } from 'lib';
import PaletteTracking from 'lib/features/palette';
import { CreateAppendAnythingModule } from 'bpmn-js-create-append-anything';


describe('PaletteTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      PaletteTracking,
      CreateAppendAnythingModule
    ]
  }));


  describe('should subscribe', function() {

    it('palette.trigger', inject(function(bpmnJSTracking, palette) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');

      const event = getPaletteEvent('create.start-event');

      // when
      palette.trigger(null, event);

      // expect
      expect(spy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('palette trigger entry', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_1');
      selection.select(element);

      const spy = sinon.spy(function(event) {
        expect(event).to.eventEqual({
          name: 'palette.trigger',
          data: {
            entryId: 'create.start-event',
            entryGroup: 'event',
            entryTitle: 'Create start event',
            selection: [ element ],
            triggerType: 'click'
          },
          type: 'tracking.event'
        });
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      triggerPalette('create.start-event');

      // then
      expect(spy).to.have.been.calledOnce;
    }));


    it('get closest "data-action"', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_1');
      selection.select(element);

      const spy = sinon.spy(function(event) {
        expect(event).to.eventEqual({
          name: 'palette.trigger',
          data: {
            entryId: 'create',
            entryGroup: 'create',
            entryTitle: 'Create element',
            selection: [ element ],
            triggerType: 'click'
          },
          type: 'tracking.event'
        });
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      const icon = domQuery('.djs-palette [data-action="create"] svg');
      dispatchClick(icon);

      // then
      expect(spy).to.have.been.calledOnce;
    }));


    it('handle broken events', inject(function(bpmnJSTracking, eventBus) {

      // when
      eventBus.fire('palette.trigger', {
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

function triggerPalette(entry) {
  const target = domQuery(`.djs-palette [data-action="${entry}"]`);

  target.click();
}

function getPaletteEvent(entryId) {
  const target = domQuery(".djs-palette [data-action='" + entryId + "']");

  return {
    target: target,
    preventDefault: function() {},
    clientX: 100,
    clientY: 100
  };
}

const dispatchClick = target => {
  const ev = new PointerEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  target.dispatchEvent(ev);
};
