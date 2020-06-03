import { Button } from "./button";
import React from "react";
import styled from "styled-components";

export const ButtonsGroup = ({ fetchPost }) => (
  <Wrapper>
    <Button onClick={fetchPost}>frontend</Button>
    <Button onClick={fetchPost}>reactjs</Button>
    <Button onClick={fetchPost}>vuejs</Button>
    <Button onClick={fetchPost}>angular</Button>
  </Wrapper>
);

const Wrapper = styled.div``;
