import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  Link,
  NavLink,
} from "remix";
import type { LinksFunction } from "remix";

import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)",
    },
    { rel: "stylesheet", href: deleteMeRemixStyles },
  ];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link
            to="/posts"
            title="Remix"
            className="remix-app__header-home-link"
          >
            <DDLogo className="logo" />
            <div>Developer DAO</div>
          </Link>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>Made by the Developer DAO community</p>
        </div>
      </footer>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

function DDLogo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <rect width="400" height="400" fill="black" />
      <rect
        x="237"
        y="262"
        width="22"
        height="86"
        transform="rotate(90 237 262)"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 122V262H76C114.66 262 146 230.66 146 192C146 153.34 114.66 122 76 122H27ZM57 152L57 232H76C98.0914 232 116 214.091 116 192C116 169.909 98.0914 152 76 152H57Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M259 122V262H308C346.66 262 378 230.66 378 192C378 153.34 346.66 122 308 122H259ZM289 152L289 232H308C330.091 232 348 214.091 348 192C348 169.909 330.091 152 308 152H289Z"
        fill="white"
      />
    </svg>
  );
}
