import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../redux/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/sessionSlice";

type FormData = {
  email: string;
  password: string;
};

const schema: yup.SchemaOf<FormData> = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginScreen = () => {
  const [loginQuery, loginResult] = useLoginMutation();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    loginQuery({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((res) => {
        dispatch(login({ accessToken: res.token, role: res.role }));
      });
  };

  return (
    <Flex h="100vh" w="full">
      <Container
        maxW={"sm"}
        alignSelf={"center"}
        rounded="8px"
        bg="white"
        p={{ base: "20px", md: "30px" }}
        shadow="lg"
      >
        <Text
          textAlign={"center"}
          fontWeight="medium"
          fontSize={{ base: "14px", md: "16px" }}
          mt="0px !important"
          color="#000"
        >
          Login
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel fontWeight={"medium"}>Email</FormLabel>
            <StyledInput
              id="email"
              {...register("email")}
              type={"email"}
              placeholder={"Email"}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel mt={"2"} fontWeight={"medium"}>
              Password
            </FormLabel>
            <StyledInput
              id="password"
              {...register("password")}
              type={"password"}
              placeholder={"Password"}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            borderRadius={6}
            type="submit"
            variant="solid"
            colorScheme="teal"
            background="#202020"
            _hover={{ bg: "#484848" }}
            _active={{ bg: "bg" }}
            fontSize={"14px"}
            h="42px"
            color="#fff"
            shadow="none"
            width="full"
            mt={"24px"}
          >
            Login
          </Button>
        </form>
      </Container>
    </Flex>
  );
};

const StyledInput = forwardRef<InputProps, "input">((props, ref) => {
  return (
    <Input
      backgroundColor="#FFFFFF"
      borderColor="#CCCCCC"
      ref={ref}
      h="42px"
      fontSize="15px"
      borderRadius={6}
      color="#000"
      borderWidth="1"
      focusBorderColor="#2A8F96"
      {...props}
    />
  );
});

export default LoginScreen;
