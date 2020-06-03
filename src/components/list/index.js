import React, { useState } from "react";
import { ListItem } from "./list-item";
import styled from "styled-components";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export const List = ({
  posts,
  removeTopic,
  toggleLike,
  loading,
  handleSort,
}) => {
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: posts,
    });

    // this is only for Firefox.
    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    handleSort(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  return (
    <Wrapper>
      {posts.map((p, index) => (
        <ListItem
          {...p}
          key={index}
          removeTopic={removeTopic}
          toggleLike={toggleLike}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          index={index}
          dragAndDrop={dragAndDrop}
        />
      ))}
      {loading && "загрузка..."}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80rem;
  margin-top: 5rem;
`;
