import axios, { type AxiosResponse } from 'axios';
import { Eventing } from './Eventing.js';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T,
  ) {}

  on = (eventName: string, callback: () => void): void => {
    return this.events.on(eventName, callback);
  };

  trigger = (eventName: string): void => {
    return this.events.trigger(eventName);
  };

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger('change');
    });
  }
}
