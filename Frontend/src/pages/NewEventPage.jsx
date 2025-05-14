import React from "react";
import EventForm from "../components/EventForm";
import { redirect } from "react-router";
function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
export async function action({ request, params }) {
  const data = await request.formData();

  const event = { title: data.title, description: data.description, date: event.date, image: event.image };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify({ event }),
    headers: { "Content-Type": "application/josn" },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }
  redirect("/events");
}
