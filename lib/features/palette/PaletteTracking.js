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

    if (!target) {
      return;
    }

    const entryElement = target.closest('[data-action]');
    const entryAction = entryElement && entryElement.getAttribute('data-action');

    if (!entryAction) {
      return;
    }

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
