import { useNavigate, Form, useNavigation, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const submitting = navigation.state === "submitting";
  console.log(event);
  function cancelHandler() {
    navigate("/events");
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={event?.title} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event?.image} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event?.date ? new Date(event.date).toISOString().split("T")[0] : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={event?.description} required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;
  const event = {
    title: data.get("title"),
    description: data.get("description"),
    date: data.get("date"),
    image: data.get("image"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") url += `/${params.eventId}`;

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify({ event }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "An Error Occured!" }, { status: response.status }));
  }
  return redirect("/events");
}
