import { defineStore } from 'pinia';
import { getApi, postApi, deleteApi } from '../axios';
import { useUserStore } from './user.ts';

interface Notebook {
  id: number
  user_id: number
  title: string
  created_at: string
  updated_at: string
};

const Notebooks: Notebook[] = JSON.parse(localStorage.getItem('notebooks') || '[{}]');

export const useNotebooksStore = defineStore('notebooks', {
  state: () => ({
    books: Notebooks || [
      {
        id: 0,
        user_id: 0,
        title: '',
        created_at: '',
        updated_at: '',
      }
    ] as Notebook[]
  }),
  getters: {
    getNotebooks(): Notebook[] {
      return this.books;
    },
  },
  actions: {
    setNotebook(notebook: Notebook[]): void {
      this.books = notebook;
      localStorage.setItem('notebooks', JSON.stringify(notebook));
    },
    addNotebook(notebook: Notebook): void {
      this.books.push(notebook);
      localStorage.setItem('notebooks', JSON.stringify(this.$state));
    },
    async createNotebook(title: string, user_id: number): Promise<void> {
      try {
        const response = await postApi('/notebooks', { title, user_id });
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
    async getNotebookById(id: number): Promise<Notebook[]> {
      try {
        const response = await getApi(`/notebooks?notebook_id=${id}`);
        return response;
      } catch (error) {
        console.error(error);
        return [{}] as Notebook[];
      }
    },
    async deleteNotebook(id: number): Promise<void> {
      try {
        await deleteApi(`/notebooks?notebook_id=${id}`);
        this.getNotebooksByUserId();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
