import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  if (data.isError) return <div style={{ textAlign: "center" }}>{<p>{data.message}</p>}</div>;

  return (
    <>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const response = await fetch("http://localhost:8080/evzents");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }

  return response;
}
