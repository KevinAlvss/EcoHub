import styled from "styled-components";

export const Content = styled.div`
  flex: 1;

  padding: 36px 150px;

  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export const Hub = styled.div`
  display: flex;
  flex-direction: column;
  
  min-width: 500px;
  width: calc(33% - 16px);
  background-color: var(--white);

  padding: 32px;

  gap: 18px;

  > img {
    width: 100%;
    margin: 0 auto;
  }

  > button {
    width: 100%;
  }
`;

export const EmptyHubContainer = styled.div`
  > p {
    font-size: 18pt;
    margin-bottom: 32px;
  }
`;