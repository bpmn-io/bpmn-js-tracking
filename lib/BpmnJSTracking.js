
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
      this._eventBus.fire('tracking.event', sanitizeEvent(event));
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


// helpers //////////////////////

export function sanitizeEvent(event) {
  if (!event.data) {
    event.data = {};
  }

  for (const [ key, value ] of Object.entries(event.data)) {
    if (Array.isArray(value)) {
      event.data[key] = value.map(sanitizeValue);
    } else {
      event.data[key] = sanitizeValue(value);
    }
  }

  return event;
}

function sanitizeValue(value) {
  if (!isElement(value)) {
    return value;
  }

  return {
    type: value.type || value.$type,
    collapsed: value.collapsed,
    attachers: value.attachers && value.attachers.map(sanitizeValue),
    incoming: value.incoming && value.incoming.map(sanitizeValue),
    outgoing: value.outgoing && value.outgoing.map(sanitizeValue),
    parent: value.parent && sanitizeValue(value.parent)
  };
}

function isElement(value) {
  return value && (value.$type || value.type);
}