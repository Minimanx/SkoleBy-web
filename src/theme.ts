import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeOverride: ThemeOverride = {
  shadows: {
    outline: "none",
  },
  components: {},
  fonts: {
    heading: `'Heading Font Name', sans-serif`,
    body: `'Body Font Name', sans-serif`,
  },
  config: {
    cssVarPrefix: "chakra",
    initialColorMode: "light",
    useSystemColorMode: false,
  },
};

const theme = extendTheme(themeOverride);

export default theme;
