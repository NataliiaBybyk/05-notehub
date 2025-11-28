export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;

  tag: NoteTag;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: NoteTag;
}
