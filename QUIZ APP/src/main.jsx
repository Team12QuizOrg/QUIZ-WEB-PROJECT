import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/Theme.js'
import { ColorModeScript } from '@chakra-ui/react'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      style={{ position: 'fixed', width: '100%', height: '100%' }}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
