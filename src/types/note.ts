export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNotesNew {
  title: string;
  content: string;
  tag: NoteTag;
}
