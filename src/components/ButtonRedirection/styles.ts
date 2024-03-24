import styled from "styled-components";

export const DefaultButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 14pt;
  width: 200px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--button-height);
`;

export const ImageContainer = styled.div`
  height: var(--button-height);
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    height: 20px;
    width: 20px;
  }

  > p {
    margin-left: 10px;
  }
`;