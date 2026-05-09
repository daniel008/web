import axios, { type AxiosResponse } from 'axios';
import type { UserProps } from './User.js';
import { User } from './User.js';
import { Eventing } from './Eventing.js';

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  on = (eventName: string, callback: () => void): void => {
    return this.events.on(eventName, callback);
  };

  trigger = (eventName: string): void => {
    return this.events.trigger(eventName);
  };

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: UserProps) => {
        const user = User.buildUser(value);
        this.models.push(user);
      });
      this.trigger('change');
    });
  }
}
