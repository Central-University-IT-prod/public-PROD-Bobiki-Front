import { lazy } from "react";

export const CreateMeetingPageAsync = lazy(() =>
  import("./CreateMeetingPage").then((page) => ({
    default: page.CreateMeetingPage,
  }))
);
