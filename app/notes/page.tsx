"use client"

import { useState, useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteModal from '../../components/NoteModal/NoteModal';
import styles from './App.module.css';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import type { Note } from '../../types/note';

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, isError, isSuccess } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    enabled: debouncedSearch.length >= 0,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data?.totalPages && data?.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data?.totalPages && data?.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
