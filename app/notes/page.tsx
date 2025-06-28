import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

const NotesPage = async () => {
  const page = 1;
  const search = "";

  const { notes, totalPages } = await fetchNotes({ search, page });

  return (
    <NotesClient
      initialNotes={notes}
      initialPage={page}
      initialSearch={search}
      totalPages={totalPages}
    />
  );
};

export default NotesPage;