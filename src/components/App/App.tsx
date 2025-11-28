import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

import { Toaster } from "react-hot-toast";
import css from "./App.module.css";

export default function App() {
  const [params, setParams] = useState({
    search: "",
    page: 1,
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const updateSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({
        ...prev,
        search: event.target.value,
        page: 1,
      }));
    },
    300
  );

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", params.search, params.page],
    queryFn: () => fetchNotes(params),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div className={css.app}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toast-container",
          style: {
            zIndex: 9999,
          },
        }}
      />
      <header className={css.toolbar}>
        <SearchBox value={params.search ?? ""} onChange={updateSearchQuery} />
        {isSuccess && data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={params.page ?? 1}
            onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {isSuccess && data?.notes.length === 0}

      {data && !isLoading && <NoteList notes={data.notes} />}

      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />{" "}
        </Modal>
      )}
    </div>
  );
}
