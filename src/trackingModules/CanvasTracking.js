export const CANVAS_EVENTS = {
  '.djs-context-pad .entry': {
    eventName: 'canvas.contextPad',
    dataType: 'action'
  },
  '.djs-popup .entry': {
    eventName: 'canvas.popupMenu',
    dataType: 'id'
  },
  '.djs-palette-entries .entry': {
    eventName: 'canvas.palette',
    dataType: 'action'
  }
};

export default class CanvasTracking {
  constructor(selection, canvas, bpmnJSTracking) {
    this._selection = selection;
    this._canvas = canvas;
    this._bpmnJSTracking = bpmnJSTracking;

    this.addEventListeners(this._canvas);
  }

  trackEvent(event) {
    let payload = {};

    const element = event.target;
    const eventType = event.type;

    Object.keys(CANVAS_EVENTS).forEach(eventSelector => {
      if (matches(element, eventSelector)) {
        const canvasEvent = CANVAS_EVENTS[eventSelector];
        const { eventName, dataType } = canvasEvent;

        payload.name = `${eventName}.${eventType}`;
        payload[dataType] = element.dataset[dataType];
        payload.selection = this._selection.get();

        this._bpmnJSTracking.track(payload);
      }
    });
  }

  addEventListeners(canvas) {
    const diagramContainer = canvas.getContainer();
    diagramContainer.addEventListener('click', this.trackEvent.bind(this), true);
    diagramContainer.addEventListener('dragstart', this.trackEvent.bind(this), true);
  }
}

CanvasTracking.$inject = [ 'selection', 'canvas','bpmnJSTracking' ];

// helpers ///////////////////////////////

function matches(element, selector) {
  return element.matches(selector) ? element : null;
}