import {
  bootstrapModeler,
  getBpmnJS,
  inject,
  bootstrapPropertiesPanel
} from '../TestHelper';

import BpmnJSTracking from 'lib/BpmnJSTracking';
import BpmnJSTrackingModules from 'lib/features';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import {
  CreateAppendAnythingModule
} from 'bpmn-js-create-append-anything';


var singleStart = window.__env__ && window.__env__.SINGLE_START;


describe('BpmnJSTracking', function() {

  const diagram = require('./simple.bpmn').default;

  beforeEach(bootstrapPropertiesPanel(diagram, {
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      BpmnJSTracking,
      BpmnJSTrackingModules,
      CreateAppendAnythingModule
    ]
  }));


  (singleStart ? it.only : it)('should include tracking module', function() {

    // given
    const trackingService = getBpmnJS().get('bpmnJSTracking');

    trackingService.enable();

    if (singleStart) {
      trackingService.on('tracking.event', function(event) {
        console.log('tracking.event', event);
      });
    }

    // then
    expect(trackingService).to.exist;
  });


  it('should inject tracking modules', function() {

    // given
    const modeler = getBpmnJS();

    // then
    expect(modeler.get('selectionTracking')).to.exists;
    expect(modeler.get('popupMenuTracking')).to.exists;
  });


  it('should enable', function() {

    // given
    const trackingService = getBpmnJS().get('bpmnJSTracking');

    // when
    trackingService.enable();

    // then
    expect(trackingService.isEnabled()).to.be.true;

  });


  it('should disable', function() {

    // given
    const trackingService = getBpmnJS().get('bpmnJSTracking');

    // when
    trackingService.disable();

    // then
    expect(trackingService.isEnabled()).to.be.false;

  });


  describe('track', function() {
    let trackingService;
    const trackSpy = sinon.spy();

    beforeEach(bootstrapModeler(diagram, {
      additionalModules: [
        BpmnJSTracking
      ],
      bpmnJSTracking: {
        track: trackSpy
      }
    }));

    beforeEach(function() {
      trackingService = getBpmnJS().get('bpmnJSTracking');
      trackingService.enable();
    });


    it('should use track callback if provided', function() {

      // when
      trackingService.track({ foo: 'bar' });

      // then
      expect(trackSpy).to.have.been.calledOnce;

    });


    it('should emit tracking event', inject(function(eventBus) {

      // given
      const trackingSpy = sinon.spy(function(event) {
        expect(event['foo']).to.eq('bar');
      });

      eventBus.on('tracking.event', trackingSpy);

      // when
      trackingService.track({ foo: 'bar' });

      // then
      expect(trackingSpy).to.have.been.calledOnce;

    }));


    it('should strip PII data', inject(function(elementRegistry, eventBus) {
      const trackingSpy = sinon.spy(function(event) {
        expect(event.data.myCustomPayload.businessObject?.name).not.to.exist;
        expect(event.data.myCustomPayload.id).not.to.exist;
      });

      eventBus.on('tracking.event', trackingSpy);

      const element = elementRegistry.get('StartEvent_1');

      // assume
      expect(element.businessObject.name).to.eql('My very secret label');
      expect(element.id).to.eql('StartEvent_1');

      // when
      trackingService.track({
        data: {
          myCustomPayload: element
        }
      });

      // then
      expect(trackingSpy).to.have.been.calledOnce;

    }));

  });

});
