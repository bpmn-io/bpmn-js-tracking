import { isTrackingModuleEnabled } from '../Util';

export default class SelectionTracking {
  constructor(eventBus, bpmnJSTracking, config) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;

    if (isTrackingModuleEnabled(config, 'selectionTracking')) {
      this._eventBus.on('selection.changed', this.trackEvent.bind(this));
    }
  }

  trackEvent(event) {
    this._bpmnJSTracking.track({
      name: 'diagram.select',
      data: {
        oldSelection: event.oldSelection,
        newSelection: event.newSelection
      }
    });
  }
}

SelectionTracking.$inject = [ 'eventBus','bpmnJSTracking', 'config.bpmnJSTracking' ];
