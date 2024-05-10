import styled from "styled-components";
import bubble from "../../images/bubble-background-2.svg";

export const Page = styled.div`
  display: flex;
  padding-top: 20vh;
  flex: 1;
`;

export const LeftSide = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: column;
  padding-left: 150px;
`;

export const RightSide = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: column;

  background-image: url(${bubble});
  background-repeat: no-repeat;
  background-position: bottom right;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin-bottom: 5vh;
  
  > h1 {
    font-size: 54px;
  }
  > p {
    font-size: 24px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin-bottom: 5vh;
`;

export const ImgPerson = styled.img`
  height: 60vh;
  z-index: 2;
`;

export const BackgroundPessoas = styled.img`
  position: absolute;
  z-index: 1;
`;
