import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import {
  query as domQuery
} from 'min-dom';

import { injectStyles } from 'test/TestHelper';

import BpmnJSTracking from 'src';

import { CANVAS_EVENTS } from 'src/trackingModules/CanvasTracking';


describe('CanvasTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;
  const trackSpy = sinon.spy();

  injectStyles();

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking
    ]
  }));


  describe('should track', function() {

    beforeEach(function() {
      getBpmnJS().get('bpmnJSTracking').enable();
    });

    afterEach(inject(function() {
      trackSpy.resetHistory();
    }));


    describe('palette interaction', function() {

      it('click', inject(function(bpmnJSTracking) {

        // given
        const paletteIcon = domQuery(Object.keys(CANVAS_EVENTS)[2]);

        const spy = expectEvent('canvas.palette.click', 'data-action', paletteIcon);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        paletteIcon.click();

        // then
        expect(spy).to.have.been.calledOnce;

      }));


      it('dragstart', inject(function(bpmnJSTracking) {

        // given
        const paletteIcon = domQuery(Object.keys(CANVAS_EVENTS)[2]);

        const spy = expectEvent('canvas.palette.dragstart', 'data-action', paletteIcon);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        paletteIcon.dispatchEvent(new Event('dragstart'));

        // then
        expect(spy).to.have.been.calledOnce;

      }));

    });


    describe('palette interaction', function() {

      it('click', inject(function(elementRegistry, selection, bpmnJSTracking) {

        // given
        const element = elementRegistry.get('StartEvent_1');
        selection.select(element);

        const contextPad = domQuery(Object.keys(CANVAS_EVENTS)[0]);

        const spy = expectEvent('canvas.contextPad.click', 'data-action', contextPad);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        contextPad.click();

        // then
        expect(spy).to.have.been.calledOnce;

      }));


      it('dragstart', inject(function(elementRegistry, selection, bpmnJSTracking) {

        // given
        const element = elementRegistry.get('StartEvent_1');
        selection.select(element);

        const contextPad = domQuery(Object.keys(CANVAS_EVENTS)[0]);

        const spy = expectEvent('canvas.contextPad.dragstart', 'data-action', contextPad);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        contextPad.dispatchEvent(new Event('dragstart'));

        // then
        expect(spy).to.have.been.calledOnce;

      }));
    });



    describe('popupMenu interaction', function() {

      it('click', inject(function(elementRegistry, selection, bpmnJSTracking) {

        // given
        openContextPad(elementRegistry, selection);

        const popupMenu = domQuery(Object.keys(CANVAS_EVENTS)[1]);

        const spy = expectEvent('canvas.popupMenu.click', 'data-id', popupMenu);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        popupMenu.click();

        // then
        expect(spy).to.have.been.calledOnce;

      }));


      it('dragstart', inject(function(elementRegistry, selection, bpmnJSTracking) {

        // given
        openContextPad(elementRegistry, selection);

        const popupMenu = domQuery(Object.keys(CANVAS_EVENTS)[1]);

        const spy = expectEvent('canvas.popupMenu.dragstart', 'data-id', popupMenu);

        bpmnJSTracking.on('tracking.event', spy);

        // when
        popupMenu.dispatchEvent(new Event('dragstart'));

        // then
        expect(spy).to.have.been.calledOnce;

      }));

    });

  });

});


// helpers ///////////////////////////////

function openContextPad(elementRegistry, selection) {

  // given
  const element = elementRegistry.get('StartEvent_1');
  selection.select(element);

  const contextPad = domQuery('.bpmn-icon-screw-wrench');

  contextPad.click();
}

function expectEvent(name, dataType, element) {
  return getBpmnJS().invoke(function(selection) {
    return sinon.spy(function(event) {
      expect(event['name']).to.eql(name);
      expect(event[dataType]).to.eql(element.getAttribute(dataType));
      expect(event['selection']).to.eql(selection.get());
    });
  });
}
