import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';


import { BpmnJSTracking } from 'lib';
import PopupMenuTracking from 'lib/features/popup-menu';


describe('PopupMenuTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      PopupMenuTracking
    ]
  }));


  describe('should subscribe', function() {

    it('popupMenu.open', inject(function(elementRegistry, bpmnJSTracking, popupMenu) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');
      const element = elementRegistry.get('StartEvent_1');

      // when
      popupMenu.open(element, 'bpmn-replace', { x: 0, y: 0 });

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('popupMenu.trigger', inject(function(elementRegistry, bpmnJSTracking, popupMenu) {

      // given
      const element = elementRegistry.get('StartEvent_1');

      popupMenu.open(element, 'bpmn-replace', { x: 0, y: 0 });
      const spy = sinon.spy(bpmnJSTracking, 'track');

      const event = getPopupMenuEvent('replace-with-none-intermediate-throwing');

      // when
      popupMenu.trigger(event);

      // expect
      expect(spy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('popup menu open', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const shape = elementRegistry.get('StartEvent_1');
      selection.select(shape);

      const spy = sinon.spy(function(event) {
        const { name, data } = event;
        expect(name).to.eql('popupMenu.open');
        expect(data.selection).to.eql([ shape ]);
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      triggerContextPad(shape, 'replace', 'click');

      // then
      expect(spy).to.have.been.calledOnce;

    }));


    it('popup menu trigger entry', inject(function(elementRegistry, selection, bpmnJSTracking) {

      // given
      const shape = elementRegistry.get('StartEvent_1');
      selection.select(shape);

      const spy = sinon.spy(function(event) {
        if (event.name === 'popupMenu.trigger') {
          const { data } = event;
          expect(data.entryId).to.eql('replace-with-none-intermediate-throwing');
          expect(data.entryGroup).to.eql('default');
          expect(data.entryLabel).to.eql('Intermediate Throw Event');
          expect(data.triggerType).to.eql('click');
        }
      });

      bpmnJSTracking.on('tracking.event', spy);

      // when
      triggerContextPad(shape, 'replace', 'click');
      triggerPopupMenu('replace-with-none-intermediate-throwing', 'click');

      // then
      expect(spy).to.have.been.called;
      expect(spy.getCalls()[1].args[1].name).to.eql('popupMenu.trigger');
    }));

  });

});


// helpers /////////

function triggerContextPad(shape, entry, action) {
  const contextPad = getBpmnJS().get('contextPad');

  const pad = contextPad.getPad(shape),
        html = pad.html,
        target = domQuery(`[data-action="${entry}"]`, html);

  target.click();
}

function triggerPopupMenu(entryId) {

  const popupMenu = domQuery('.djs-popup', document.body);
  const entry = domQuery(`[data-id="${entryId}"] .djs-popup-label`, popupMenu);

  entry.click();
}

function getPopupMenuEvent(entryId) {
  const target = domQuery(".djs-popup [data-id='" + entryId + "']");

  return {
    target: target,
    preventDefault: function() {},
    clientX: 100,
    clientY: 100
  };
}