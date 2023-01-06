import { useToast } from "@chakra-ui/toast";
import React from "react";
import { bindHooksToRTKErrorLogger } from "../redux/rtkQueryErrorLogger";

const RTKErrorLoggerHooksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const toast = useToast();

  bindHooksToRTKErrorLogger(toast);

  return <>{children}</>;
};

export default RTKErrorLoggerHooksProvider;
