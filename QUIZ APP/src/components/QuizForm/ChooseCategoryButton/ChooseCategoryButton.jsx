import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CreateNewCategoryButton = ({func, label}) => {

  return (
    <Button
    onClick={func}
    mr={4}
    background={"brand.200"}
  >
    {label}
  </Button>
  );
};

CreateNewCategoryButton.propTypes = {
    func: PropTypes.func,
    label: PropTypes.string
  };
export default CreateNewCategoryButton;