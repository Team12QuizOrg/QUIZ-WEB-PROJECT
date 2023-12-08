import { useState, useEffect, useCallback } from 'react'
import { Box, Heading, Text, Spinner, VStack, Image, Collapse } from '@chakra-ui/react'
import { GiTimeBomb } from 'react-icons/gi'
import PropTypes from 'prop-types'
import bomb from '../../../../assets/bomb.jpg'

const Timer = ({ endTimeUnix, onTimerFinish }) => {
  const calculateTimeRemaining = useCallback(() => {
    const currentTimeUnix = Math.floor(Date.now() / 1000)
    return Math.floor(Math.max(0, endTimeUnix - currentTimeUnix))
  }, [endTimeUnix])

  const [time, setTime] = useState('12:12')
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const remainingTime = calculateTimeRemaining()
      setTime(remainingTime)
      setLoading(false)
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [calculateTimeRemaining])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`

    return `${formattedMinutes}:${formattedSeconds}`
  }

  useEffect(() => {
    if (time === 0) {
      onTimerFinish()
    }
  }, [time, onTimerFinish])

  return (
    <Box
      textAlign="center"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
      <VStack>
      <Heading as="h1" size="xl" mb={1} >
      <GiTimeBomb/>
      {isOpen && (
        <Collapse in={isOpen} animateOpacity >
          <Box
            p='40px'
            color='white'
            shadow='md'
          >
             <Image src={bomb} justifyContent={'center'} w={{ base: '320', md: '450', lg: '580' }} h={{ base: '250', md: '350', lg: '380' }} rounded={'md'} order={{ base: 0, lg: 1 }} alignItems={{ base: 'center', lg: 'start' }} boxShadow={'0 4px 6px rgba(0, 0, 0, 0.1)'} />
           </Box>
        </Collapse>
      )}
      </Heading>
      {loading
        ? (
        <Spinner size="xl" />
          )
        : (
        <Text fontSize="3xl">{formatTime(time)}</Text>
          )}
      </VStack>
    </Box>
  )
}

Timer.propTypes = {
  endTimeUnix: PropTypes.number,
  onTimerFinish: PropTypes.func
}
export default Timer
