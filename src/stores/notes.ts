//Notes Store
import { defineStore } from "pinia";
import { getApi, postApi, patchApi, deleteApi } from "../axios";

export interface Note {
  id: number;
  title: string;
  content: string;
  notebook_id: number | string;
  created_at?: string;
  updated_at?: string;
}

const Notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[{}]");

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes:
      Notes ||
      ([
        {
          id: 0,
          title: "",
          content: "",
          notebook_id: 0,
          created_at: "",
          updated_at: "",
        },
      ] as Note[]),
  }),
  getters: {
    getNotes: (state): Note[] => {
      return state.notes;
    },
    getNotesByNotebookId: (state) => (notebook_id: number | string) => {
      const target: number =
        typeof notebook_id === "string" ? parseInt(notebook_id) : notebook_id;
      return state.notes.filter((note) => note.notebook_id === target);
    },
    getNoteById: (state) => (id: number) => {
      return state.notes.find((note) => note.id === id);
    },
  },
  actions: {
    async getNotesByNotebook(notebook_id: number | string): Promise<Note[]> {
      const target: number =
        typeof notebook_id === "string" ? parseInt(notebook_id) : notebook_id;
      try {
        const response = await getApi(`/notes?notebook_id=${target}`);
        localStorage.setItem("notes", JSON.stringify(response));
        this.notes = response;
        return response;
      } catch (error) {
        console.error(error);
        return [{}] as Note[];
      }
    },
    async createNote(
      title: string,
      content: string,
      notebook_id: number | string,
    ): Promise<void> {
      try {
        const response = await postApi("/notes", {
          title,
          content,
          notebook_id,
        });
        this.addNote(response);
      } catch (error) {
        console.error(error);
      }
    },
    async updateNoteById(
      id: number,
      title: string,
      content: string,
    ): Promise<void> {
      try {
        const response = await patchApi(`/notes`, { id, title, content });
        this.updateNote(response);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNoteById(id: number): Promise<void> {
      try {
        await deleteApi(`/notes?id=${id}`);
        this.notes = this.notes.filter((note) => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(this.$state));
      } catch (error) {
        console.error(error);
      }
    },
    addNote(note: Note): void {
      this.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(this.$state));
    },
    updateNote(note: Note): void {
      const index = this.notes.findIndex((n) => n.id === note.id);
      this.notes[index] = note;
      localStorage.setItem("notes", JSON.stringify(this.$state));
    },
  },
});
