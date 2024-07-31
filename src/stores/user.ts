import { defineStore } from 'pinia';
import { getApi, postApi } from '../axios.ts';

type User = {
  id: number;
  token: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
};

//TODO: Make it so when getting user information if undefined then getUser() from api
export const useUserStore = defineStore('user', {
  state: (): User => {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      token: localStorage.getItem('token') || '',
      id: user.id || 0,
      username: user.username || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
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
        id: this.id,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
      };
    }
  },
  actions: {
    async getuser(): Promise<void> {
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
    async uploadProfilePic(data: object): Promise<void> {
      try {
        const response = await postApi('/upload-profile-pic', data);
        response.then((data: object) => {
          console.log(data);
          // Save User in localStorage
          localStorage.setItem('user', JSON.stringify(data));
        });
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(data: User): Promise<void> {
      try {
        const response = await postApi('/users', data);
        response.then((data: { user: User }) => {
          this.id = data.user.id;
          this.username = data.user.username;
          this.first_name = data.user.first_name;
          this.last_name = data.user.last_name;
          this.email = data.user.email;
          // Save User in localStorage
          localStorage.setItem('user', JSON.stringify(data));
        })
      } catch (error) {
        console.error(error);
      }
    },
    setUser(user: User): void {
      // Save User in state
      this.id = user.id;
      this.username = user.username;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;

      // Save User in localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    login(token: string): void {
      // Save token in state
      this.token = token;
      // Save token in localStorage
      localStorage.setItem('token', token);
    },
    logout(): void {
      localStorage.removeItem('token');
      this.token = '';
    },
  },
});
