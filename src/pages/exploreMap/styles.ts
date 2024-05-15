import styled from "styled-components";

export const ComponentsContainer = styled.div`
    display: flex;
    flex: 1;

    gap: 26px;

    padding: 36px 150px;
`;

export const MapContainer = styled.div`
    flex: 2;
`;

export const ButtonsContainer = styled.div`
    flex: 1;

    > h1 {
        font-size: 36pt;
    }

    > p {
        font-size: 16pt;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 32px 0;
`;