import trackingModules from './trackingModules';
class BpmnJSTracking {

  constructor(config, selection, eventBus, canvas) {
    this._eventBus = eventBus;

    this._isEnabled = false;

    this.trackingModules = [];

    // init tracking modules
    trackingModules.forEach((trackingConstructor) => {
      this.trackingModules.push(new trackingConstructor({
        track: this.track.bind(this),
        _selection: selection,
        _canvas: canvas
      }));
    });

    // setup tracking if configured
    if (config && config.track)
      this.on('tracking.event', config.track);

  }

  isEnabled() {
    return this._isEnabled;
  }

  enable() {
    this._isEnabled = true;

    this.trackingModules.forEach((module) => {
      module.enable();
    });

    this._eventBus.fire('tracking.enabled');
  }

  disable() {
    this._isEnabled = false;

    this._eventBus.fire('tracking.disabled');
  }

}

BpmnJSTracking.$inject = [ 'config.bpmnJSTracking', 'selection', 'eventBus', 'canvas' ];

BpmnJSTracking.prototype.on = function(event, priority, callback, target) {
  return this._eventBus.on(event, priority, callback, target);
};

BpmnJSTracking.prototype.track = function(event) {
  if (this.isEnabled()) {
    this._eventBus.fire('tracking.event', event);
  }
};

export default {
  __init__: [
    'bpmnJSTracking'
  ],
  bpmnJSTracking: [ 'type', BpmnJSTracking ]
};