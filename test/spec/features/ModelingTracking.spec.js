import {
  bootstrapModeler,
  inject,
  getBpmnJS
} from 'test/TestHelper';

import { BpmnJSTracking } from 'lib';
import ModelingTracking from 'lib/features/modeling';


describe('ModelingTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      ModelingTracking
    ]
  }));


  describe('should subscribe', function() {

    it('commandStack.shape.create.postExecuted', inject(function(bpmnJSTracking, modeling, canvas) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      createElements();

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('commandStack.shape.append.postExecuted', inject(function(bpmnJSTracking, elementRegistry) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');
      const shape = elementRegistry.get('StartEvent_1');

      // when
      appendShape(shape);

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('commandStack.shape.replace.postExecuted', inject(function(bpmnJSTracking, elementRegistry) {

      // given
      const spy = sinon.spy(bpmnJSTracking, 'track');

      const oldShape = elementRegistry.get('StartEvent_1');

      replaceShape(oldShape);

      // expect
      expect(spy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('element created', inject(function(bpmnJSTracking) {

      // given
      const spy = sinon.spy();
      bpmnJSTracking.on('tracking.event', spy);

      // when
      const elements = createElements();

      // then
      expect(spy).to.have.been.called;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'modeling.createElements',
        data: {
          elements
        }
      });
    }));


    it('element appended', inject(function(bpmnJSTracking, elementRegistry) {

      // given
      const spy = sinon.spy();
      const source = elementRegistry.get('StartEvent_1');

      bpmnJSTracking.on('tracking.event', spy);

      // when
      const appendedElement = appendShape(source);

      // then
      expect(spy).to.have.been.called;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'modeling.appendElement',
        data: {
          sourceElement: source,
          element: appendedElement
        }
      });
    }));


    it('element replaced', inject(function(bpmnJSTracking, elementRegistry) {

      // given
      const spy = sinon.spy();
      const oldElement = elementRegistry.get('StartEvent_1');

      bpmnJSTracking.on('tracking.event', spy);

      // when
      const newElement = replaceShape(oldElement);

      // then
      expect(spy).to.have.been.called;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'modeling.replaceElement',
        data: {
          oldElement,
          newElement
        }
      });
    }));

  });

});


// helpers /////////

function createElements() {
  const modeling = getBpmnJS().get('modeling');
  const canvas = getBpmnJS().get('canvas');

  return modeling.createElements(
    { type: 'bpmn:Task' },
    { x: 0, y: 0 },
    canvas.getRootElement()
  );
}

function appendShape(source) {
  const modeling = getBpmnJS().get('modeling');

  return modeling.appendShape(source, { type: 'bpmn:Task' });
}

function replaceShape(shape) {
  const replace = getBpmnJS().get('bpmnReplace');

  return replace.replaceElement(shape, { type: 'bpmn:EndEvent' });
}