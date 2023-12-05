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
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
});

export default theme;
