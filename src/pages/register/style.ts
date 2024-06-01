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

  > a {
    text-decoration: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > input {
    background-color: var(--white);
    border: none;
    height: var(--input-height);
    border-radius: 8px;
    padding: 0 40px;
    font-size: 12pt;
    width: "600px";
  }
`;