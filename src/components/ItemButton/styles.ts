import styled from "styled-components";

type ItemButtonProps = {
  selected: boolean
}

export const DefaultButton = styled.button<ItemButtonProps>`
  background-color: ${props => props.selected ? '#836fff80' : 'var(--opaque-primary-color)'};
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
    background: linear-gradient(180deg, var(--opaque-primary-color) 0%, var(--primary-color) 100%);
  }
`;
