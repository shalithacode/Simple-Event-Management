import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import RootEventLayout from "./pages/RootEventLayout";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, { loader as eventLoader, deleteAction } from "./pages/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPage";

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
            { path: ":eventId", element: <EventDetailPage />, loader: eventLoader, action: deleteAction },
            { path: "new", element: <NewEventPage />, action: newEventAction },
            { path: ":eventId/edit ", element: <EditEventPage /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
