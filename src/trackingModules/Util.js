export function getEventType(event) {

  if (event instanceof PointerEvent) {
    return 'click';
  } else if (event instanceof DragEvent) {
    return 'drag';
  } else if (event instanceof KeyboardEvent) {
    return 'keyboard';
  }
}