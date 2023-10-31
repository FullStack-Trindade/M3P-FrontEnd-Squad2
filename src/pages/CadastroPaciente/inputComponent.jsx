import { Controller } from "react-hook-form";
import TextMask from "react-text-mask";

import PropTypes from 'prop-types';

const InputComponent = ({ label, name, control, type = 'text', mask, guide, placeholder, options, ...rest }) => {
  return (
    <div>
      <label>{label}:</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === 'select') {
            return (
              <select {...field} {...rest}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          } else if (mask) {
            return (
              <TextMask
                {...field}
                type={type}
                mask={mask}
                guide={guide}
                placeholder={placeholder}
                {...rest}
              />
            );
          } else {
            return (
              <input type={type} {...field} placeholder={placeholder} {...rest} />
            );
          }
        }}
      />
    </div>
  );
};

export default InputComponent;

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  guide: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};



