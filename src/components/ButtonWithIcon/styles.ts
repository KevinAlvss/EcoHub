import styled from "styled-components";

type ButtonWithoutIconProps = {
  width?: string;
};

export const DefaultButton = styled.button<ButtonWithoutIconProps>`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 16pt;
  width: ${(props) => (props.width ? props.width : "300px")};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  height: var(--button-height);
`;

export const ImageContainer = styled.div`
  background-color: var(--secondary-color);
  height: var(--button-height);
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;

  > img {
    height: 30px;
    width: 30px;
  }
`;

export const TextContainer = styled.div`
  flex-grow: 1;
`;
