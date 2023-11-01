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
        <Styled.Label>{label}:</Styled.Label>
        {type === "select" ? (
          <div>
            <Styled.Select
              {...field}
              {...rest}
              style={{ borderColor: invalid ? "red" : "initial" }}
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
              style={{ borderColor: invalid ? "red" : "initial" }}
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
              style={{ borderColor: invalid ? "red" : "initial" }}
            />
          </div>
        )}
        {invalid && <p style={{ color: "red" }}>{error.message}</p>}
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
