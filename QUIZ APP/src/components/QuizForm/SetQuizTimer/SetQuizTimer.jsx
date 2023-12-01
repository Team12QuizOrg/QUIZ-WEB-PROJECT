import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SetQuizTimer = ({ time, unit, onChangeTime, onChangeUnit }) => {
  const handleTimeChange = (value) => {
    onChangeTime(value);
  };

  const handleUnitChange = (selectedUnit) => {
    onChangeUnit(selectedUnit);
  };

  return (
    <FormControl color="black" mb={2} flex="1" maxW="100%">
      <FormLabel fontSize="medium" h={10}>
        Set timer:
      </FormLabel>
      <Input
        type="text"
        value={time}
        onChange={(e) => handleTimeChange(e.target.value)}
        variant="filled"
        focusBorderColor="black"
        bg="brand.300"
        placeholder="Min: 5 minutes, Max: 3 hours"
      />
      <Select value={unit} onChange={(e) => handleUnitChange(e.target.value)} mt={2}>
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </Select>
    </FormControl>
  );
};

SetQuizTimer.propTypes = {
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.oneOf(["minutes", "hours"]),
  onChangeTime: PropTypes.func,
  onChangeUnit: PropTypes.func,
};

export default SetQuizTimer;

