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
      fontSize: ['3xl', '4xl', '5xl'], 
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['48px', '64px'], 
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h3: {
      fontSize: ['2xl', '3xl', '4xl'], 
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h4: {
      fontSize: ['24px', '32px'], 
      fontWeight: 'medium',
      lineHeight: '110%',
      letterSpacing: '-0.5%',
    },
    body: {
      fontSize: ['20px', '24px'], 
      fontWeight: 'normal',
      lineHeight: '150%',
      letterSpacing: '0.5%',
    },
    caption: {
      fontSize: ['18px', '20px'], 
      fontWeight: 'normal',
      lineHeight: '150%',
      letterSpacing: '0.25%',
    },
    h3WithLetterStyle: {
      fontSize: ['24px', '36px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
      textDecoration: 'overline',
      textDecorationColor: 'blue.400', 
      display: 'inline',
    },
  },
});

export default theme;
