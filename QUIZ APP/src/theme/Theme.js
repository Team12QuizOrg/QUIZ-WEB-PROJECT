import { extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#F8F4F3',
        color: 'black'
      },
    }),
  },
  colors: {
    brand: {
      100: "#F8F4F3",
      200: "#F7B315",
      300: "#dddfe2",
      400: "black",
      // ...
      900: "#1a202c",
    },
  },
});

export default theme;
