
class EventBus {
  constructor() {
    this.eventObject = {}
  }

  subscribe(eventName, callback, id) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    this.eventObject[eventName][id] = callback;

    console.log(`${id} is subscribing on ${eventName}`);
  }

  unsubscribeEventById(eventName, id) {
    const callbackList = this.eventObject[eventName];
    if (!callbackList) return console.warn(eventName + " not found!");

    delete callbackList[id];
    if (Object.keys(callbackList).length === 0)
      delete this.eventObject[eventName];

    console.log(`${id} is unsubscribing on ${eventName}`);
  }

  unsubscribeById(id) {
    Object.keys(this.eventObject)
      .forEach(eventName => this.unsubscribeEventById(eventName, id));
  }

  unsubscribeByEvent(eventName) {
    const callbackList = this.eventObject[eventName];
    if (!callbackList) return console.warn(eventName + " not found!");

    Object.keys(callbackList)
      .forEach(id => this.unsubscribeEventById(eventName, id));
  }

  unsubscribeAll() {
    Object.keys(this.eventObject)
      .forEach(eventName => this.unsubscribeByEvent(eventName));
  }

  publish(eventName, arg) {
    const callbackList = this.eventObject[eventName];
    if (!callbackList) return console.warn(eventName + " not found!");

    Object.keys(callbackList)
      .forEach(id => callbackList[id](arg));
  }

  getEvents() {
    return Object.keys(this.eventObject);
  }

}

const eventBus = new EventBus();

export { eventBus }
