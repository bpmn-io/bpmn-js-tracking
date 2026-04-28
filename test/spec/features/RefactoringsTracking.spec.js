import { expect } from 'chai';
import { spy } from 'sinon';

import {
  bootstrapModeler,
  inject
} from 'test/TestHelper';

import RefactoringsModule from '@bpmn-io/refactorings';

import { BpmnJSTracking } from 'lib';
import RefactoringsTracking from 'lib/features/refactorings';

class FoobarProvider {
  constructor(eventBus, refactorings) {
    refactorings.registerProvider(this);

    this._eventBus = eventBus;
  }

  /**
   * @param {Element[]} elements
   *
   * @returns {Refactoring[]}
   */
  getRefactorings(elements) {
    return [
      {
        id: 'foo',
        label: 'Foo',
        execute: () => {
          this._eventBus.fire('refactorings.execute', {
            refactoring: {
              type: 'foo'
            }
          });
        }
      }
    ];
  }
}

FoobarProvider.$inject = [ 'eventBus', 'refactorings' ];


describe('RefactoringsTracking', function() {

  const diagram = require('test/spec/simple.bpmn').default;

  beforeEach(bootstrapModeler(diagram, {
    additionalModules: [
      BpmnJSTracking,
      RefactoringsTracking,
      RefactoringsModule,
      {
        __init__: [
          'foobarProvider'
        ],
        foobarProvider: [ 'type', FoobarProvider ],
        openAIElementTemplatesProvider: [ 'value', null ]
      }
    ]
  }));


  describe('should subscribe', function() {

    it('refactorings.execute', inject(async function(elementRegistry, bpmnJSTracking, refactorings) {

      // given
      const trackSpy = spy(bpmnJSTracking, 'track');

      const element = elementRegistry.get('StartEvent_1');

      const [ refactoring ] = await refactorings.getRefactorings([ element ]);

      // when
      refactoring.execute();

      // expect
      expect(trackSpy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('popup menu open', inject(async function(bpmnJSTracking, elementRegistry, refactorings) {

      // given
      const element = elementRegistry.get('StartEvent_1');

      const trackSpy = spy(function(event) {
        expect(event).to.eventEqual({
          name: 'refactorings.execute',
          data: {
            refactoring: {
              type: 'foo'
            }
          },
          type: 'tracking.event'
        });
      });

      bpmnJSTracking.on('tracking.event', trackSpy);

      const [ refactoring ] = await refactorings.getRefactorings([ element ]);

      // when
      refactoring.execute();

      // then
      expect(trackSpy).to.have.been.calledOnce;
    }));

  });

});