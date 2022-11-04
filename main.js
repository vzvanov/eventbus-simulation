import { eventBus } from './EventBus.js';

//Event Sources
const red_source = document.querySelector('.item-red');
red_source.onclick = () => {
  let event = 'set_red';
  eventBus.publish(event, 'red');
  showInfo(`Event: ${event} is ON`);
}

const yellow_source = document.querySelector('.item-yellow');
yellow_source.onclick = () => {
  let event = 'set_yellow';
  eventBus.publish(event, 'yellow');
  showInfo(`Event: ${event} is ON`);
}

const green_source = document.querySelector('.item-green');
green_source.onclick = () => {
  let event = 'set_green';
  eventBus.publish(event, 'green');
  showInfo(`Event: ${event} is ON`);
}

const none_source = document.querySelector('.item-none');
none_source.onclick = () => {
  let event = 'set_none';
  eventBus.publish(event, 'none');
  showInfo(`Event: ${event} is ON`);
}

const setBackground = (id, arg) => {
  const subscriber = document.querySelector(`#subscriber-${id}`);
  try {
    subscriber.style = `background-color: ${arg};`;
  } catch (e) {
    console.log(e);
  }
}

const showInfo = (message) => {
  const info = document.querySelector('.event-bus-info');
  info.innerHTML = message;
}

const getTrueOrFalse = () => {
  if (Math.random() < 0.5) return false;
  return true;
}

const NumberOfSubscribers = 28;

// Generate subscribers

let subscribers = document.querySelector('.subscribers');

for (let id = 1; id <= NumberOfSubscribers; id++) {
  let subscriber = document.createElement('div');
  subscriber.className = `subscriber`;
  subscriber.id = `subscriber-${id}`;
  subscriber.innerHTML = `${id}`;
  subscribers.append(subscriber);
}

// Generate subscriptions

for (let id = 1; id <= NumberOfSubscribers; id++) {

  if (getTrueOrFalse()) {
    eventBus.subscribe('set_red', (arg) => {
      setBackground(`${id}`, arg);
    }, id);
  }

  if (getTrueOrFalse()) {
    eventBus.subscribe('set_yellow', (arg) => {
      setBackground(`${id}`, arg);
    }, id);
  }

  if (getTrueOrFalse()) {
    eventBus.subscribe('set_green', (arg) => {
      setBackground(`${id}`, arg);
    }, id);
  }

  eventBus.subscribe('set_none', (arg) => {
    setBackground(`${id}`, arg);
  }, id);
}
