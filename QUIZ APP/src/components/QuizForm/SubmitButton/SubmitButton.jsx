import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SubmitButton = ({func}) => {

  return (
    <Button
    w={120}
    onClick={func}
    colorScheme="black"
    variant="solid"
    size="md"
    mt={2}
    background={"blue.400"}
  >
    Submit
  </Button>
  );
};

SubmitButton.propTypes = {
    func: PropTypes.func,
  };
export default SubmitButton;