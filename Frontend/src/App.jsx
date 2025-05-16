import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import RootEventLayout from "./pages/RootEventLayout";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, { loader as eventLoader, deleteAction } from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPage";
import { action as eventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <RootEventLayout />,
          children: [
            { index: true, element: <EventsPage />, loader: eventsLoader },
            {
              path: ":eventId",
              id: "event-details",
              loader: eventLoader,
              children: [
                { index: true, element: <EventDetailPage />, action: deleteAction },
                { path: "edit", element: <EditEventPage />, action: eventAction },
              ],
            },

            { path: "new", element: <NewEventPage />, action: eventAction },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
