import axios from "axios";

import type { Note, NoteFormData } from "../types/note";

const API = "https://notehub-public.goit.study/api";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// Параметри запиту
export interface FetchNotesParams {
  page: number;
  search: string;
}

// Відповідь від сервера
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(`${API}/notes`, {
    params: { search: search, page: page, perPage: 12 },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};

//createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
export const createNote = async (newNote: NoteFormData): Promise<Note> => {
  const res = await axios.post<Note>(`${API}/notes`, newNote, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};

//deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${API}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};
