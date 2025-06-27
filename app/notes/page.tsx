import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const NotesPage = async () => {
  const queryClient = new QueryClient();

  // Тут задаємо параметри за замовчуванням
  const defaultSearch = "";
  const defaultPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", defaultSearch, defaultPage],
    queryFn: () => fetchNotes({ search: defaultSearch, page: defaultPage }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;