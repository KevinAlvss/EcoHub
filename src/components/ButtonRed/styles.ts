import styled from "styled-components";

type ButtonRedProps = {
  width?: string;
};

export const DefaultButton = styled.button<ButtonRedProps>`
  background-color: var(--red);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 16pt;
  width: ${(props) => (props.width ? props.width : "300px")};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--button-height);
`;
