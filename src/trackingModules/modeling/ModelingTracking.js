export default class ModelingTracking {
  constructor(eventBus, bpmnJSTracking, elementRegistry, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._elementRegistry = elementRegistry;
    this._selection = selection;

    this._eventBus.on(
      'commandStack.elements.create.postExecuted',
      this.trackElementsCreate.bind(this)
    );

    this._eventBus.on(
      'commandStack.shape.append.postExecuted',
      this.trackElementAppend.bind(this)
    );

    this._eventBus.on(
      'commandStack.shape.replace.postExecuted',
      this.trackElementReplace.bind(this)
    );
  }

  trackElementsCreate(e) {
    const { context } = e;

    this._bpmnJSTracking.track({
      name: 'modeling.createElements',
      data: {
        elements: context.elements
      }
    });
  }

  trackElementAppend(e) {
    const { shape, source } = e.context;

    this._bpmnJSTracking.track({
      name: 'modeling.appendElement',
      data: {
        element: shape,
        sourceElement: source
      }
    });
  }

  trackElementReplace(e) {
    const { oldShape, newShape } = e.context;

    this._bpmnJSTracking.track({
      name: 'modeling.replaceElement',
      data: {
        newElement: newShape,
        oldElement: oldShape
      }
    });
  }
}

ModelingTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'elementRegistry',
  'selection'
];
