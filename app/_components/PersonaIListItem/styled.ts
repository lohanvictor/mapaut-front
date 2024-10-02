import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 40px;
  gap: 16px;
  padding: 8px;
  width: 100%;
  cursor: pointer;

  transition: 0.2s;

  border-radius: 8px;

  .img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
