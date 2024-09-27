import styled from "styled-components";

export const ImgContainer = styled.div`
  &:hover {
    span.add {
      display: block;
    }
  }

  position: relative;

  img#demographic-characteristics-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
  }

  span.add {
    display: none;
    font-size: 14px;
    color: #fff;
  }
`;
