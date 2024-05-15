import styled from "styled-components";

export const DefaultButton = styled.button`
  background-color: var(--opaque-primary-color);
  color: var(--black);
  border: none;
  border-radius: 8px;
  font-size: 12pt;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 175px;
  max-width: 200px;
  width: calc(50% - 16px);

  > div > img {
    margin-bottom: 8px;
  }

  &:hover{
    background: var(--background-color);
    background: linear-gradient(180deg, var(--background-color) 0%, var(--primary-color) 100%);
  }
`;
