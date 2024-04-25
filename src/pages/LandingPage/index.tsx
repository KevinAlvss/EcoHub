import {
    ButtonGreen,
    ButtonRed,
    ButtonRedirection,
    ButtonWithIcon,
    ButtonWithoutIcon,
    Container,
    Header,
    InputDefault,
    InputSelect,
} from "../../components";
import location from "../../images/location.svg";
import pessoas from "../../images/Pessoas.svg";
import login from "../../images/Login.svg";
import background from "../../images/Background.svg";
import { Page, LeftSide, RightSide, TextContainer, ButtonContainer, ImgPessoas, BackgroundPessoas } from './style';


export function LandingPage() {
    return (
        <Container>
            <Header />
            <Page>
            <LeftSide>
                <TextContainer>
                    <h1>Seu mapa de coleta de resíduos.</h1>
                    <h3>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</h3>
                </TextContainer>
                <ButtonContainer>
                    <ButtonWithIcon img={location}> Encontrar ponto de coleta </ButtonWithIcon>
                    <ButtonWithIcon img={login}> Cadastre um ponto de coleta </ButtonWithIcon>
                </ButtonContainer>
            </LeftSide>
            <RightSide>
                <ImgPessoas src={pessoas}></ImgPessoas>
                <BackgroundPessoas src={background}></BackgroundPessoas>
            </RightSide>
            </Page>
        </Container>
    )
}