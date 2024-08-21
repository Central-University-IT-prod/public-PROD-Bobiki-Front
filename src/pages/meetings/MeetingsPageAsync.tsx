import { lazy } from "react";

export const MeetingsPageAsync = lazy(() =>
  import("./MeetingsPage").then((page) => ({ default: page.MeetingsPage }))
);
