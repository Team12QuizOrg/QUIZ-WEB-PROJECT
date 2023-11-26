import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CancelButton = ({ func }) => {
  return (
    <Button
      type="button"
      onClick={func}
      colorScheme="black"
      variant="solid"
      size="md"
      mt={2}
      background={"blue.400"}
    >
      Cancel
    </Button>
  );
};

CancelButton.propTypes = {
  func: PropTypes.func,
};
export default CancelButton;
