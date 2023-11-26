import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CreateQuestionButton = ({ func }) => {
  return (
    <Button
    onClick={func}
    mb={4}
    background={"blue.400"}
  >
    Create question
  </Button>
  );
};

CreateQuestionButton.propTypes = {
  func: PropTypes.func,
};
export default CreateQuestionButton;
