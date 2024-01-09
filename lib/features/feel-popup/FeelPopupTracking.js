export default class PopupEditorTracking {
  constructor(eventBus, bpmnJSTracking, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._selection = selection;

    this._eventBus.on('feelPopup.opened', this.trackOpen.bind(this));
    this._eventBus.on('feelPopup.closed', this.trackClosed.bind(this));
  }

  trackOpen() {
    this._bpmnJSTracking.track({
      name: 'feelPopup.opened',
      data: {
        selection: this._selection.get(),
      }
    });
  }

  trackClosed() {
    this._bpmnJSTracking.track({
      name: 'feelPopup.closed',
      data: {
        selection: this._selection.get(),
      }
    });
  }
}

PopupEditorTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'selection'
];
