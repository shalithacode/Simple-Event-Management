import { useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import classes from "../components/PageContent.module.css";

function EventsPage() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<p className={classes.content + " " + classes.highlight_text}> {"Loading..."}</p>}>
      <Await resolve={data.events}>{(loadedEvent) => <EventsList events={loadedEvent.events} />}</Await>
    </Suspense>
  );
}

export default EventsPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }

  const data = await response.json();

  return data;
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}
