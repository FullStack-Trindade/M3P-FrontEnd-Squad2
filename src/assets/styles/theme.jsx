import styled from "styled-components";
import theme from "styled-theming";

export const Theme = theme.variants("mode", "variant", {
  blue: {
    blue_darkest: "#004A63",
    blue_dark: "#065B74",
    blue_medium: "#0D6C86",
    blue_light: "#137C97",
    blue_lightest: "#198DAB",
  },
  dark: {
    black_darkest: "#000000",
    black_dark: "#0d0d0d",
    black_medium: "#464646",
    black_light: "#636363",
    black_lightest: "#808080",
  },
  white: {
    white_darkest: "#b9b9b9",
    white_dark: "#cacaca",
    white_medium: "#dcdcdc",
    white_light: "#ededed",
    white_lightest: "#ffffff",
  },
});

/* const Button = styled.button`
  background-color: ${backgroundColor};
`;
 
Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning'])
};
 
Button.defaultProps = {
  variant: 'default',
};
 
<Button/>
<Button variant="primary"/>
<Button variant="success"/>
<Button variant="warning"/> */