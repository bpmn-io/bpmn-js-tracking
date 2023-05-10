
class BpmnJSTracking {

  constructor(config, eventBus) {
    this._eventBus = eventBus;

    this._isEnabled = false;

    // setup tracking if configured
    if (config && config.track)
      this.on('tracking.event', config.track);

  }

  isEnabled() {
    return this._isEnabled;
  }

  enable() {
    this._isEnabled = true;

    this._eventBus.fire('tracking.enabled');
  }

  disable() {
    this._isEnabled = false;

    this._eventBus.fire('tracking.disabled');
  }

  on(...args) {
    return this._eventBus.on(...args);
  }

  track(event) {
    if (this.isEnabled()) {
      this._eventBus.fire('tracking.event', event);
    }
  }
}

BpmnJSTracking.$inject = [ 'config.bpmnJSTracking', 'eventBus' ];

export default {
  __init__: [
    'bpmnJSTracking'
  ],
  bpmnJSTracking: [ 'type', BpmnJSTracking ]
};