import styled from "styled-components";

export const Page = styled.div`
    display: flex;
    padding-top: 20vh;
`
export const LeftSide = styled.div`
    display: flex;
    width: 50vw;
    flex-direction: column;
    padding-left: 150px;
`
export const RightSide = styled.div`
    display: flex;
    width: 50vw;
    flex-direction: column;
`
export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;
    margin-bottom: 5vh;
`
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;
    margin-bottom: 5vh;
`
export const ImgPessoas = styled.img`
    height: 60vh;
    z-index: 2;
`
export const BackgroundPessoas = styled.img`
    position: absolute;
    z-index: 1;
`
