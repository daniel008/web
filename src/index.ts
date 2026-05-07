import { User } from './models/User.js';

const user = new User({ name: 'John', age: 0 });

user.on('change', () => {
  console.log('user was changed');
});
