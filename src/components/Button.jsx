import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 15px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Button = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
