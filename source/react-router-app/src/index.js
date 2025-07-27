import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import HomePage from './pages/home';
import LivePage from './pages/live';
import WebPage from './pages/web';
import BackendPage from './pages/backend';
import ContactPage from './pages/contact';
import NotFoundPage from './pages/404';
import LessonPage from './pages/lesson';
import ProductPage from './pages/product';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: (
          <HomePage />
        ),
      },
      {
        path: "live",
        element: <LivePage />,
      },
      {
        path: "web",
        element: <WebPage />,
      },
      {
        path: "backend",
        element: <BackendPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "lesson",
        element: <LessonPage />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
