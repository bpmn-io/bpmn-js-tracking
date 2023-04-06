import { getEventType } from '../../Util';

export default class PopupMenuTracking {
  constructor(eventBus, bpmnJSTracking, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._selection = selection;

    this._eventBus.on('popupMenu.open', this.trackOpen.bind(this));
    this._eventBus.on('popupMenu.trigger', this.trackTrigger.bind(this));
  }

  trackOpen() {
    this._bpmnJSTracking.track({
      name: 'controls.popupMenu.open',
      data: {
        selection: this._selection.get(),
      }
    });
  }

  trackTrigger(e) {
    const { entry, event } = e;

    const type = getEventType(event);

    this._bpmnJSTracking.track({
      name: 'controls.popupMenu.trigger',
      data: {
        entryLabel: entry.label,
        triggerType: type
      }
    });
  }
}

PopupMenuTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'selection'
];
