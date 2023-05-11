export default class SelectionTracking {
  constructor(eventBus, bpmnJSTracking) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;

    this._eventBus.on('selection.changed', this.trackEvent.bind(this));
  }

  trackEvent(event) {
    this._bpmnJSTracking.track({
      name: 'selection.select',
      data: {
        oldSelection: event.oldSelection,
        newSelection: event.newSelection
      }
    });
  }
}

SelectionTracking.$inject = [ 'eventBus', 'bpmnJSTracking' ];
