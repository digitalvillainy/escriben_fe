//Notes Store
import { defineStore } from 'pinia';
import { getApi, postApi } from '../axios';

export interface Note {
  id: number;
  title: string;
  content: string;
  notebook_id: number;
  created_at: string;
  updated_at: string;
}[];

const Notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[{}]');

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: Notes || [
      {
        id: 0,
        title: '',
        content: '',
        notebook_id: 0,
        created_at: '',
        updated_at: '',
      }
    ] as Note[],
  }),
  getters: {
    getNotes: (): Note[] => {
      return this.notes;
    },
    getNotesByNotebookId: (state) => (notebook_id: number) => {
      return state.notes.filter((note) => note.notebook_id === notebook_id);
    },
    getNoteById: (state) => (id: number) => {
      return state.notes.find((note) => note.id === id);
    }
  },
  actions: {
    async getNotesByNotebook(notebook_id: number): Promise<Note[]> {
      try {
        const response = await getApi(`/notes?notebook_id=${notebook_id}`);
        localStorage.setItem('notes', JSON.stringify(response));
        this.notes = response;
        return response;
      } catch (error) {
        console.error(error);
        return [{}] as Note[];
      }
    },
    async createNote(title: string, content: string, notebook_id: number): Promise<void> {
      try {
        const response = await postApi(`/notes?notebook_id=${notebook_id}&title=${title}&content=${content}`);
        this.addNote(response);
      } catch (error) {
        console.error(error);
      }
    },
    addNote(note: Note): void {
      this.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(this.$state));
    },
  }
});
