import {
  inject,
  bootstrapPropertiesPanel,
  whenStable,
  getBpmnJS
} from '../../TestHelper';

import BpmnJSTracking from 'lib/BpmnJSTracking';
import ElementTemplatesTracking from 'lib/features/element-templates';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule as ElementTemplatesProviderModule
} from 'bpmn-js-properties-panel';

import ZeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';

import templates from './ElementTemplatesTracking.templates.json';

import {
  query as domQuery,
  queryAll as domQueryAll
} from 'min-dom';


describe('ElementTemplatesTracking', function() {

  const diagramXML = require('../simple.bpmn').default;

  beforeEach(bootstrapPropertiesPanel(diagramXML, {
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      ZeebePropertiesProviderModule,
      ElementTemplatesProviderModule,
      BpmnJSTracking,
      ElementTemplatesTracking
    ],
    moddleExtensions: {
      zeebe: ZeebeModdle
    },
    elementTemplates: templates
  }));


  describe('should subscribe', function() {

    it('elementTemplates.select', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_1');
      await selectElement(element);

      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      clickPropertiesPanelButton();

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('elementTemplates.update', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_2');
      await selectElement(element);

      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[0];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('elementTemplates.unlink', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_2');
      await selectElement(element);

      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[1];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
    }));


    it('elementTemplates.remove', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const element = elementRegistry.get('StartEvent_2');
      await selectElement(element);

      const spy = sinon.spy(bpmnJSTracking, 'track');

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[2];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
    }));

  });


  describe('should track', function() {

    beforeEach(inject(function(bpmnJSTracking) {
      bpmnJSTracking.enable();
    }));

    it('select element template', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const spy = sinon.spy();
      const element = elementRegistry.get('StartEvent_1');

      await selectElement(element);

      bpmnJSTracking.on('tracking.event', spy);

      // when
      clickPropertiesPanelButton();

      // expect
      expect(spy).to.have.been.calledOnce;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'elementTemplates.select',
        data: {
          element
        }
      });
    }));


    it('update element template', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const spy = sinon.spy();
      const element = elementRegistry.get('StartEvent_2');

      await selectElement(element);

      bpmnJSTracking.on('tracking.event', spy);

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[0];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'elementTemplates.update',
        data: {
          element,
          newTemplate: templates[1]
        }
      });
    }));


    it('unlink element template', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const spy = sinon.spy();
      const element = elementRegistry.get('StartEvent_2');

      await selectElement(element);

      bpmnJSTracking.on('tracking.event', spy);

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[1];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'elementTemplates.unlink',
        data: {
          element
        }
      });
    }));


    it('remove element template', inject(async function(elementRegistry, bpmnJSTracking) {

      // given
      const spy = sinon.spy();
      const element = elementRegistry.get('StartEvent_2');

      await selectElement(element);

      bpmnJSTracking.on('tracking.event', spy);

      // when
      clickPropertiesPanelButton();

      const updateBtn = domQueryAll('.bio-properties-panel-dropdown-button__menu button')[2];
      updateBtn.click();

      // expect
      expect(spy).to.have.been.calledOnce;
      expect(spy.getCalls()[0].args[1]).to.eql({
        name: 'elementTemplates.remove',
        data: {
          element
        }
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

function clickPropertiesPanelButton() {
  const button = domQuery('[data-group-id="group-ElementTemplates__Template"] .bio-properties-panel-group-header-button');
  button.click();
}