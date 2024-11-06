import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  .button {
    position: absolute;
    top: 8px;
    right: 8px;
    border-radius: 50%;
    background-color: #fff;
    width: 3rem;
    height: 3rem;

    &:hover {
        background-color: #f2f2f2;
    }
  }
`;
