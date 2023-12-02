import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Timer = ({ initialTime, onTimerFinish }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          clearInterval(timerInterval);
          Promise.resolve().then(() => onTimerFinish());
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialTime, onTimerFinish]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Manually format minutes and seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

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
      <Text fontSize="3xl">{formatTime(time)}</Text>
    </Box>
  );
};

export default Timer;
