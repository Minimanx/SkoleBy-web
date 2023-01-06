import "./reset.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import JWTProvider from "./containers/JWTProvider";
import { AuthLayoutRoute, Dashboard } from "./Navigation";
import chakraTheme from "./theme";
import RTKErrorLoggerHooksProvider from "./containers/RTKErrorLoggerHooksProvider";
import Fonts from "./fonts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayoutRoute />}></Route>
      <Route path="app/*" element={<Dashboard />}></Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme} resetCSS={true}>
        <Fonts />
        <JWTProvider>
          <RTKErrorLoggerHooksProvider>
            <RouterProvider router={router} />
          </RTKErrorLoggerHooksProvider>
        </JWTProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
