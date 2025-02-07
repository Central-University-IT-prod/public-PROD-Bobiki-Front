/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as IndexImport } from './app/routes/index'
import { Route as MeetingsIndexImport } from './app/routes/meetings/index'
import { Route as EditingIndexImport } from './app/routes/editing/index'
import { Route as CreateIndexImport } from './app/routes/create/index'
import { Route as MeetingsMeetingIdIndexImport } from './app/routes/meetings/$meetingId/index'
import { Route as EditingMeetingIdIndexImport } from './app/routes/editing/$meetingId/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MeetingsIndexRoute = MeetingsIndexImport.update({
  path: '/meetings/',
  getParentRoute: () => rootRoute,
} as any)

const EditingIndexRoute = EditingIndexImport.update({
  path: '/editing/',
  getParentRoute: () => rootRoute,
} as any)

const CreateIndexRoute = CreateIndexImport.update({
  path: '/create/',
  getParentRoute: () => rootRoute,
} as any)

const MeetingsMeetingIdIndexRoute = MeetingsMeetingIdIndexImport.update({
  path: '/meetings/$meetingId/',
  getParentRoute: () => rootRoute,
} as any)

const EditingMeetingIdIndexRoute = EditingMeetingIdIndexImport.update({
  path: '/editing/$meetingId/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/create/': {
      preLoaderRoute: typeof CreateIndexImport
      parentRoute: typeof rootRoute
    }
    '/editing/': {
      preLoaderRoute: typeof EditingIndexImport
      parentRoute: typeof rootRoute
    }
    '/meetings/': {
      preLoaderRoute: typeof MeetingsIndexImport
      parentRoute: typeof rootRoute
    }
    '/editing/$meetingId/': {
      preLoaderRoute: typeof EditingMeetingIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/meetings/$meetingId/': {
      preLoaderRoute: typeof MeetingsMeetingIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CreateIndexRoute,
  EditingIndexRoute,
  MeetingsIndexRoute,
  EditingMeetingIdIndexRoute,
  MeetingsMeetingIdIndexRoute,
])

/* prettier-ignore-end */
