import { App } from "app/App";
import { Main } from "app/Main";
import { Page404 } from "common/components/Page404/Page404";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Login } from "features/auth/Login/Login";
import { selectIsLoggedIn } from "features/auth/model/authSelector";
import { createBrowserRouter, Navigate, Outlet, RouteObject } from "react-router-dom";

export const Path = {
  Login: "login",
} as const;

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: Path.Login,
    element: <Login />,
  },
];
export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={Path.Login} />;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);
