import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Pokedex from "./pokedex/Pokedex";
import { loader as pokedexLoader } from "./pokedex/Pokedex";
import { loader as pokemonLoadder } from "./pokemon/Pokemon";
import Error from "./Error";
import Pokemon from "./pokemon/Pokemon";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./Home";
import LoaderFullPage from "./ui/LoaderFullPage";
import PageNotFound from "./PageNotFound";

// TODO: Remove duplicate path "/"
const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Navigate to="/en/home" replace />, // Default language is 'en'
        },
        {
          path: "/:lang", // ':lang' language parameter for all child routes
          element: <AppLayout />,
          errorElement: <Error />,
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "pokedex",
              element: <Pokedex />,
              loader: pokedexLoader,
              HydrateFallback: LoaderFullPage,
            },
            {
              path: "pokemon/:dexId",
              element: <Pokemon />,
              loader: pokemonLoadder,
              HydrateFallback: LoaderFullPage,
            },
            {
              path: "*",
              element: <PageNotFound />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
