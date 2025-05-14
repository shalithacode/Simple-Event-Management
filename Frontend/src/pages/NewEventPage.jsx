import React from "react";
import EventForm from "../components/EventForm";
import { redirect } from "react-router";
function NewEventPage() {
  return <EventForm method={"POST"} />;
}

export default NewEventPage;

// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
export async function action({ request, params }) {
  const data = await request.formData();

  const event = {
    title: data.get("title"),
    description: data.get("description"),
    date: data.get("date"),
    image: data.get("image"),
  };
  console.log(event);
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify({ event }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }
  return redirect("/events");
}
