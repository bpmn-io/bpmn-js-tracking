export default class ContextPadTracking {
  constructor(eventBus, bpmnJSTracking) {
    this._bpmnJSTracking = bpmnJSTracking;
    this._eventBus = eventBus;

    this._eventBus.on('refactorings.execute', this.trackRefactoring.bind(this));
  }

  trackRefactoring(event) {
    const { refactoring } = event;

    this._bpmnJSTracking.track({
      name: 'refactorings.execute',
      data: {
        refactoring
      }
    });
  }
}

ContextPadTracking.$inject = [
  'eventBus',
  'bpmnJSTracking'
];
