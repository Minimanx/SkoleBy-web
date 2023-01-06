import { UseToastOptions } from "@chakra-ui/toast";
import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";

let toast: ((options: UseToastOptions) => any) | null = null;

export const bindHooksToRTKErrorLogger = (_toast: any) => {
  toast = _toast;
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.error(
        "WARNING: Redux async middleware rejected an action - the error is logged to Sentry."
      );
      if (toast !== null && action.payload.status !== 401) {
        // captureException(new Error(JSON.stringify(action)))

        toast({
          title: "Error",
          description:
            action.payload?.data?.message ||
            "Unknown error" +
              (action.payload?.status ? " - " + action.payload.status : ""),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    return next(action);
  };
