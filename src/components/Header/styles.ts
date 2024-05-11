import styled from "styled-components";

export const Wrapper = styled.div`
  > a {
    display: flex;
    align-items: center;
    padding: 36px 150px;

    text-decoration: none;

    > img {
      margin-right: 26px;
    }

    > h1 {
      font-size: 32pt;
      font-family: Roboto;
      font-weight: 700;
    }
  }
`;

export const GreenText = styled.h1`
  color: var(--logo-green);
`;
