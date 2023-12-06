import { useState, useEffect, useCallback } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";

const Timer = ({ endTimeUnix, onTimerFinish }) => {
  const calculateTimeRemaining = useCallback(() => {
    const currentTimeUnix = Math.floor(Date.now() / 1000);
    return Math.floor(Math.max(0, endTimeUnix - currentTimeUnix));
  }, [endTimeUnix]);

  const [time, setTime] = useState('12:12');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const remainingTime = calculateTimeRemaining();
      setTime(remainingTime);
      setLoading(false); 
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [calculateTimeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (time === -1) {
      onTimerFinish();
    }
  }, [time, onTimerFinish]);

  return (
    <Box
      textAlign="center"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" size="xl" mb={4}>
        Timer
      </Heading>
      {loading ? (
        <Spinner size="xl" /> 
      ) : (
        <Text fontSize="3xl">{formatTime(time)}</Text>
      )}
    </Box>
  );
};

export default Timer;
