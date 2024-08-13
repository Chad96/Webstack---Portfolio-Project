import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
