import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  position: relative;

  .container-hover {
    display: none;
    cursor: pointer;
  }

  &:hover .container-hover {
    display: block;
    opacity: 0.2;
  }
`;
