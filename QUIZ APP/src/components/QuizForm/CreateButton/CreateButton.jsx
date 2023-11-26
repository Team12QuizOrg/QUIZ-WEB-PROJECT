import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CreateButton = ({ func }) => {
  return (
    <Button
      onClick={func}
      colorScheme="black"
      variant="solid"
      size="md"
      gridColumn="span 2"
      borderRadius="3%"
      boxShadow="md"
      borderColor="brand.200"
      borderWidth={"thick"}
      alignItems="center"
      background={"blue.400"}
      w={'16%'}
    >
      Create Quiz
    </Button>
  );
};

CreateButton.propTypes = {
  func: PropTypes.func,
};
export default CreateButton;
