import {
  inject,
  bootstrapPropertiesPanel,
  whenStable,
  getBpmnJS,
  expectEventually
} from '../../TestHelper';

import BpmnJSTracking from 'lib/BpmnJSTracking';
import FeelPopupTracking from 'lib/features/feel-popup';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
} from 'bpmn-js-properties-panel';

import ZeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';

import {
  query as domQuery
} from 'min-dom';


describe('FeelPopupTracking', function() {

  const diagramXML = require('./FeelPopupTracking.bpmn').default;

  beforeEach(bootstrapPropertiesPanel(diagramXML, {
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      ZeebePropertiesProviderModule,
      BpmnJSTracking,
      FeelPopupTracking
    ],
    moddleExtensions: {
      zeebe: ZeebeModdle
    },
    propertiesPanel: {
      layout: {
        'open': true,
        'groups': { 'taskDefinition': { 'open': true } }
      }
    }
  }));


  describe('should subscribe', function() {

    it('track lifecycle feelPopup.opened', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('Activity_1');
      await selectElement(element);

      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      await whenStable();
      openFeelPopup();

      await expectEventually(() => {
        expect(spy).to.have.been.calledOnce;
      });


      closeFeelPopup();

      await expectEventually(() => {
        expect(spy).to.have.been.calledTwice;
      });
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));


    it('open popup editor', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('Activity_1');
      await selectElement(element);

      const openSpy = sinon.spy(
        function(event) {
          expect(event).to.eventEqual({
            name: 'feelPopup.opened',
            data: {
              selection: [ element ]
            },
            type: 'tracking.event'
          });
        }
      );

      bpmnJSTracking.on('tracking.event', openSpy);

      // when
      openFeelPopup();

      // expect
      await expectEventually(() => {
        expect(openSpy).to.have.been.calledOnce;
      });

      // cleanup
      closeFeelPopup();
    }));


    it('close popup editor', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('Activity_1');
      await selectElement(element);
      openFeelPopup();
      await whenStable();

      const closeSpy = sinon.spy(
        function(event) {
          expect(event).to.eventEqual({
            name: 'feelPopup.closed',
            data: {
              selection: [ element ]
            },
            type: 'tracking.event'
          });
        }
      );

      bpmnJSTracking.on('tracking.event', closeSpy);

      // when
      closeFeelPopup();

      // expect
      await expectEventually(() => {
        expect(closeSpy).to.have.been.calledOnce;
      });
    }));

  });

});


// helpers //////////////////////

async function selectElement(element) {
  return await getBpmnJS().invoke(async function(selection) {
    selection.select(element);
    await whenStable(50);
  });
}

function openFeelPopup() {
  const button = domQuery('.bio-properties-panel-open-feel-popup');
  button.click();
}

function closeFeelPopup() {
  const button = domQuery('.bio-properties-panel-feel-popup__close-btn');
  button.click();
}