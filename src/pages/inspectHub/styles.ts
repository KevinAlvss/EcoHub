import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex: 1;

  gap: 26px;

  padding: 36px 150px;
`;

export const ImageContainer = styled.div`
  flex: 4;

  > img {
    width: 90%;
  }
`;

export const InfoContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 36px;

  > h1 {
    font-size: 36pt;
  }
`;

export const Materials = styled.p`
  font-size: 16pt;
  color: var(--primary-color);
  text-transform: capitalize;
  display: flex;
`;

export const RouteContainer = styled.div``;

export const RouteTitle = styled.strong``;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;

  > button {
    width: 40%;
  }
`;
