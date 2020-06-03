import React from "react";
import styled from "styled-components";

export const ListItem = ({
  title,
  url,
  removeTopic,
  id,
  liked,
  toggleLike,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  dragAndDrop,
  index,
}) => (
  <Wrapper
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragLeave={onDragLeave}
    data-position={index}
    draggable
    className={
      dragAndDrop && dragAndDrop.draggedTo === Number(index) && "dropArea"
    }
  >
    <StatusWrapper onClick={() => toggleLike(id)}>
      {liked ? <Dislike>&#9825;</Dislike> : <Like>&#10084;</Like>}
    </StatusWrapper>
    <RemoveIcon onClick={() => removeTopic(id)}>&#9747;</RemoveIcon>
    <Title href={url}>{title}</Title>
  </Wrapper>
);

const StatusWrapper = styled.div`
  display: flex;
  width: 3rem;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;

  &.dropArea {
    background: rgba(0, 0, 0, 0.03);
    margin-left: 1em;
  }
`;

const Icon = styled.span`
  cursor: pointer;
  margin: 0 0.4rem;
`;

const RemoveIcon = styled(Icon)`
  color: red;
`;

const Like = styled(Icon)`
  font-size: 2rem;
`;
const Dislike = styled(Icon)`
  font-size: 2.5rem;
`;

const Title = styled.a`
  text-decoration: underline;
  margin-left: 1.4rem;
  &:hover {
    opacity: 0.8;
  }
`;
