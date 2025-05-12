import React from "react";
import { useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
function EventDetailPage() {
  const data = useLoaderData();
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }

  return response;
}
