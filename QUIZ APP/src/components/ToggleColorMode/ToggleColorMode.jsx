import { useState } from 'react'
import { Button, Image, Box, Collapse, Center } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import darkImage from '../../../assets/dartvader.png'
import whiteImage from '../../../assets/lightImg.png'

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)

  const onHover = () => {
    let hoverTimeout

    const handleMouseEnter = () => {
      hoverTimeout = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
    }

    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout)
      setIsOpen(false)
    }

    return { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
  }

  const { onMouseEnter, onMouseLeave } = onHover()

  return (
    <>
    <Center>
      {isOpen && (
        <Collapse in={isOpen} animateOpacity backgroundImage={colorMode === 'dark' ? 'assets/dartvader.png' : 'assets/back1.png'}>
          <Box
            p='40px'
            color='white'
            shadow='md'
            w={{ small: '320', md: '450', lg: '580' }}
            h={{ base: '250', md: '350', lg: '380' }}
          >
            {colorMode === 'dark'
              ? <Image src={darkImage} justifyContent={'center'} w={{ small: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={'md'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={'0 4px 6px rgba(0, 0, 0, 0.1)'} />
              : <Image src={whiteImage} justifyContent={'center'} w={{ small: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={'md'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={'0 4px 6px rgba(0, 0, 0, 0.1)'} />}
           </Box>
        </Collapse>
      )}
      <Button
        onClick={() => toggleColorMode()}
        pos='absolute'
        top='0'
        right='0'
        m={2.5}
        size='sm'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {colorMode === 'dark'
          ? (
          <SunIcon color='orange.200' />
            )
          : (
          <MoonIcon color='blue.700' />
            )}
      </Button>
      </Center>
    </>
  )
}

export default ToggleColorMode
