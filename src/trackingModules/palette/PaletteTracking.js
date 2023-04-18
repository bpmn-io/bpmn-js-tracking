import { getEventType } from '../Util';

export default class PaletteTracking {
  constructor(eventBus, bpmnJSTracking, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._selection = selection;

    this._eventBus.on('palette.trigger', this.trackTrigger.bind(this));
  }

  trackTrigger(e) {
    const { entry, event } = e;
    const { target } = event;

    const entryAction = target.getAttribute('data-action');

    const type = getEventType(event);

    this._bpmnJSTracking.track({
      name: 'palette.trigger',
      data: {
        entryId: entryAction,
        entryGroup: entry.group || 'default',
        entryTitle: entry.title,
        selection: this._selection.get(),
        triggerType: type
      }
    });
  }
}

PaletteTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'selection'
];
