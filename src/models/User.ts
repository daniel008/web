interface UserProps {
  id: number;
  name: string;
  age: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  // get(propName: keyof UserProps) {
  //   return this.data[propName];
  // }
  // more engineered
  get<K extends keyof UserProps>(key: K): UserProps[K] {
    return this.data[key];
  }

  // set<K extends keyof UserProps>(key: K, value: UserProps[K]): void {
  //   this.data[key] = value;
  // }

  set(updater: (prev: Readonly<UserProps>) => Partial<UserProps>): void {
    const next = updater(this.data);
    Object.assign(this.data, next);
  }

  on(eventName: string, callback: Callback) {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((callback) => {
      callback();
    });
  }
}
