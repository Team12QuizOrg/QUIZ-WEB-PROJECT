import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SetTimeLimit = ({ timeLimit, func}) => {
  return (
    <FormControl color="black" mb={2} flex="1" maxW="100%">
              <FormLabel fontSize="medium" h={10}>
                Time limit in hours:
              </FormLabel>
              <Input
                type="text"
                value={timeLimit}
                onChange={func}
                variant="filled"
                focusBorderColor="black"
                bg="brand.300"
                placeholder="Min: 30 minutes, Max: 24 hours"
              />
            </FormControl>
  );
};

SetTimeLimit.propTypes = {
    timeLimit: PropTypes.number,
    func: PropTypes.func,
  };

export default SetTimeLimit;