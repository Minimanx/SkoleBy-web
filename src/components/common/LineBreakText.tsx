import { Text } from "@chakra-ui/react";

const LineBreakText = ({ children }: { children: string }) => {
  return (
    <>
      {children.split(".lb.").map((i, index) => {
        return <Text key={index}>{i}</Text>;
      })}
    </>
  );
};

export default LineBreakText;
