import { styled } from "styled-components";

type InputDefaultProps = {
  inputWidth?: number | string | undefined;
};

export const DefaultInput = styled.input<InputDefaultProps>`
  background-color: var(--white);
  border: none;
  height: var(--input-height);
  border-radius: 8px;
  padding: 0 40px;
  font-size: 12pt;
  width: ${(props) => (props.inputWidth ? props.inputWidth : "600px")};
`;
