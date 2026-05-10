import { UserForm } from './views/UserForm.js';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found');

const userForm = new UserForm(root);

userForm.render();
