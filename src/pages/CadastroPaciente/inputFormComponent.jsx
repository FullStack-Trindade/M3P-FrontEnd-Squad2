import { Controller } from "react-hook-form";
import * as Styled from './inputFormComponent.style';


import PropTypes from 'prop-types';

const InputComponent = ({ label, name, control, type = 'text', mask, guide, placeholder, options, ...rest }) => {
  return (
    <Styled.InputGroup>
      <Styled.InputContainer>
      <Styled.Label>{label}:</Styled.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === 'select') {
            return (
              <Styled.Select {...field} {...rest}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Styled.Select>
            );
          } else if (mask) {
            return (
              <Styled.TextMaskInput
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
              <Styled.Input type={type} {...field} placeholder={placeholder} {...rest} />
            );
          }
        }}
      />
      </Styled.InputContainer>
    </Styled.InputGroup>
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



