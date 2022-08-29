export default class SelectionTracking {
  constructor(eventBus, bpmnJSTracking) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;

    this._eventBus.on('selection.changed', this.trackEvent.bind(this));
  }

  trackEvent(event) {
    const payload = {
      oldSelection: event.oldSelection,
      newSelection: event.newSelection,
      name: 'diagram.select'
    };

    this._bpmnJSTracking.track(payload);
  }
}

SelectionTracking.$inject = [ 'eventBus','bpmnJSTracking' ];
