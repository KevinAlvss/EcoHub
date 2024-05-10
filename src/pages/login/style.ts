import styled from "styled-components";
import bubble from "../../images/bubble-background-3.svg";

export const Page = styled.div`
  display: flex;
  width: 100vw;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-image: url(${bubble});
  background-repeat: no-repeat;
  background-position: bottom right;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 20vw;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
