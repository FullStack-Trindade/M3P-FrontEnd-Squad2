import { useController } from "react-hook-form";
import * as Styled from "./inputFormComponent.style";
import PropTypes from "prop-types";

const InputComponent = ({
  label,
  name,
  control,
  type = "text",
  mask,
  guide,
  placeholder,
  rules,
  options,
  ...rest
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  return (
    <Styled.InputGroup>
      <Styled.InputContainer>
        <Styled.Label $color={error && 'danger'} >{label}:</Styled.Label>
        {type === "select" ? (
          <div>
            <Styled.Select
              {...field}
              {...rest}
              $color={invalid ? "danger" : "blue-darkest"}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Styled.Select>
          </div>
        ) : mask ? (
          <div>
            <Styled.TextMaskInput
              {...field}
              type={type}
              mask={mask}
              guide={guide}
              placeholder={placeholder}
              value={field.value || ""}
              {...rest}
              $color={invalid ? "danger" : "blue-darkest"}
            />
          </div>
        ) : (
          <div>
            <Styled.Input
              type={type}
              {...field}
              value={field.value || ""}
              placeholder={placeholder}
              {...rest}
              $color={invalid ? "danger" : "blue-darkest"}
            />
          </div>
        )}
        {invalid && <Styled.ErrorMessage>{error.message}</Styled.ErrorMessage>}
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
  rules: PropTypes.object,
};
