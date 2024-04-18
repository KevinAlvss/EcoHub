import styled from "styled-components";

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 54px;
  }

  > p {
    font-size: 24px;
    width: 600px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > h2 {
    font-size: 40px;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  padding: 0 150px;
`;
