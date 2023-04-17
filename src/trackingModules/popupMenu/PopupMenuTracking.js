import { getEventType } from '../Util';

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
      name: 'popupMenu.open',
      data: {
        selection: this._selection.get(),
      }
    });
  }

  trackTrigger(e) {
    const { entry, event } = e;

    const { target } = event;

    const type = getEventType(event);

    const entryId = target.getAttribute('data-id');

    this._bpmnJSTracking.track({
      name: 'popupMenu.trigger',
      data: {
        entryId,
        entryGroup: entry.group || 'default',
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
