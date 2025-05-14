/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
function EventDetailPage() {
  const data = useLoaderData();
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }

  return response;
}

export async function deleteAction({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, { method: request.method });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }, { status: response.status }));
  }

  return redirect("/events");
}
