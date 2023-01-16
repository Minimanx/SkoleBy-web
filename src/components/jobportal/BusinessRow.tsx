import { Box, Flex } from "@chakra-ui/react";
import { Business } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";

const BusinessRow = ({
  business,
  index,
  selectedBusiness,
  setSelectedBusiness,
}: {
  business: Business;
  index: number;
  selectedBusiness: Business | undefined;
  setSelectedBusiness: Dispatch<SetStateAction<Business | undefined>>;
}) => {
  let [color, setColor] = useState("");
  useEffect(() => {
    setColor(() => {
      return selectedBusiness && selectedBusiness.id === business.id
        ? "#013c24"
        : index % 2 === 0
        ? "#0a7c4d"
        : "#166846";
    });
  }, [selectedBusiness]);
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      fontSize={{ base: "18px", md: "24px" }}
      p="3"
      backgroundColor={color}
      alignItems="center"
      borderRadius="10px"
      _hover={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedBusiness(() => {
          return business;
        });
      }}
    >
      <Flex w="70%" justifyContent="flex-start" alignItems="center">
        <Box>{business.title}</Box>
      </Flex>
      <Flex>
        <Icon icon={business.icon} width="1.5em" style={{ color: "white" }} />
      </Flex>
    </Flex>
  );
};

export default BusinessRow;
