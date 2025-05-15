import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router";

function EditEventPage() {
  const data = useRouteLoaderData("event-details");
  return <EventForm event={data.event} method={"PATCH"} />;
}

export default EditEventPage;
