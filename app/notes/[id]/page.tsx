import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from "../../../lib/api"
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{noteId: string}>;
}

const NoteDetails = async ({params}: Props) => {
const res = await params;

const queryClient = new QueryClient()
const id = Number(res);



queryClient.prefetchQuery({
queryKey:["note", id ],
queryFn: () => fetchNoteById(id),
})




return (
  <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient />
    </HydrationBoundary>
  </div>
)

}


export default NoteDetails;