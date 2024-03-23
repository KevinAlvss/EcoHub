import { Main } from "./styles";

type props = {
    children: string | JSX.Element | JSX.Element[]
}

export function Container({children} : props){
    return(
        <Main>
            {children}
        </Main>
    )
}