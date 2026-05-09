import { Model } from './Model.js';
import { Attributes } from './Attributes.js';
import { ApiSync } from './ApiSync.js';
import { Eventing } from './Eventing.js';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl),
    );
  }
}
