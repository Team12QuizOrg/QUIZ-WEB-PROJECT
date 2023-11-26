import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CreateNewCategory = ({ category, func }) => {
  return (
    <FormControl color="black" mb={2} gridColumn="span 2">
      <FormLabel fontSize="lg">Create new category:</FormLabel>
      <Input
        color="black"
        type="text"
        value={category}
        onChange={ func}
        variant="filled"
        focusBorderColor="black"
        bg="brand.300"
      />
    </FormControl>
  );
};

CreateNewCategory.propTypes = {
  category: PropTypes.string,
  func: PropTypes.func,
};

export default CreateNewCategory;
