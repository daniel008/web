export class Attributes<T extends object> {
  constructor(private data: T) {}

  // get(propName: keyof UserProps) {
  //   return this.data[propName];
  // }
  // more engineered
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  // set<K extends keyof UserProps>(key: K, value: UserProps[K]): void {
  //   this.data[key] = value;
  // }

  set(updater: Partial<T> | ((prev: Readonly<T>) => Partial<T>)): void {
    const next = typeof updater === 'function' ? updater(this.data) : updater;
    Object.assign(this.data, next);
  }
}
