import { defineStore } from "pinia";
import { getApi, postApi } from "../axios.ts";

export type UserType = {
  id: number;
  token?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic?: string;
  created_at?: string;
  updated_at?: string;
};

//TODO: Make it so when getting user information if undefined then getUser() from api
export const useUserStore = defineStore("user", {
  state: (): UserType => {
    const user: UserType = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      token: localStorage.getItem("token") || "",
      id: user.id || 0,
      username: user.username || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      profile_pic: user.profile_pic || "",
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
    getUser(): UserType {
      return {
        id: this.id,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        profile_pic: this.profile_pic,
      };
    },
  },
  actions: {
    async getuser(): Promise<void> {
      try {
        const response = await getApi(`/users?email=${this.email}`);
        this.setUser(response);
      } catch (error) {
        console.error(error);
      }
    },
    async uploadProfilePic(data: object): Promise<void> {
      try {
        const response = await postApi("/upload-profile-pic", data);
        if (response) {
          this.setUser(response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(data: UserType): Promise<void> {
      try {
        const response = await postApi("/users", data);
        if (response) {
          this.setUser(response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    setUser(user: UserType): void {
      // Save User in state
      this.id = user.id;
      this.username = user.username;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.profile_pic = user.profile_pic;

      // Save User in localStorage
      localStorage.setItem("user", JSON.stringify(user));
    },
    login(token: string): void {
      // Save token in state
      this.token = token;
      // Save token in localStorage
      localStorage.setItem("token", token);
    },
    logout(): void {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("notebooks");
      this.token = "";
    },
  },
});
