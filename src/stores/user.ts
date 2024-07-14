import {defineStore} from 'pinia';
import {getApi} from '../axios.ts';

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      id: 0,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    };
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
    getFullName(): string {
      return `${this.first_name} ${this.last_name}`;
    },
    getId(): number | string {
      return this.id;
    },
    getUser(): object {
      return {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
      };
    }
  },
  actions: {
    async getuser() {
      try {
        const response = await getApi(`/users?email=${this.email}`);
        response.then((data: { user: User }) => {
          this.id = data.user.id;
          this.username = data.user.username;
          this.first_name = data.user.first_name;
          this.last_name = data.user.last_name;
          this.email = data.user.email;
        });
      } catch (error) {
        console.error(error);
      }
    },
    setUser(user: User) {
      this.id = user.id;
      this.username = user.username;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
    },
    login(token: string) {
      this.token = token;
    },
    logout() {
      localStorage.removeItem('token');
      this.token = '';
    },
  },
});
