import { defineStore } from 'pinia';
import { getApi, postApi } from '../axios';
import { useUserStore } from './user.ts';


type Notebook = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}[];

const Notebooks: Notebook = JSON.parse(localStorage.getItem('notebooks') || '[]');
export const useNotebooksStore = defineStore('notebooks', {
  state: (): Notebook => {
    return {...Notebooks};
  },
  getters: {
    getNotebooks(state): Notebook {
      return state;
    },
  },
  actions: {
    setNotebook(notebook: Notebook): void {
      this.$state = notebook;
      localStorage.setItem('notebooks', JSON.stringify(notebook));
    },
    addNotebook(notebook: Notebook): void {
      this.$state.push(...notebook);
      localStorage.setItem('notebooks', JSON.stringify(this.$state));
    },
    async createNotebook(title: string, user_id: number): Promise<void> {
      try {
        const response = await postApi(`/notebooks?user_id=${user_id}&title=${title}`);
        this.addNotebook(response);
      } catch (error) {
        console.error(error);
      }
    },
    async getNotebooksByUserId(): Promise<void> {
      try {
        const userStore = useUserStore();
        const response = await getApi(`/notebooks?user_id=${userStore.id}`);
        this.setNotebook(response);
      } catch (error) {
        console.error(error);
      }
    },
    async getNotebookById(id: number): Promise<void> {
      try {
        const response = await getApi(`/notebooks/notebook_id=${id}`);
        this.setNotebook(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
