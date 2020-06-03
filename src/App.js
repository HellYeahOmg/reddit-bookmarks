import React, { useState, useEffect } from "react";
import { ButtonsGroup, List } from "./components";
import styled from "styled-components";

export const App = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => localStorage.setItem("posts", JSON.stringify(posts)), [
    posts,
  ]);

  const fetchPost = (e) => {
    const topic = e.target.innerText;
    setLoading(true);
    fetch(`https://www.reddit.com/r/${topic}.json`)
      .then((r) => r.json())
      .then(handlePosts);
  };

  const handlePosts = ({ data }) => {
    setLoading(false);
    const randomNum = Math.floor(
      Math.random() * (data.children.length - 0 + 1)
    );
    const post = data.children[randomNum];
    if (!post) return;
    setPosts((posts) => [
      ...posts,
      {
        title: post.data.title,
        url: post.data.url,
        id: post.data.id,
        liked: false,
      },
    ]);
  };

  const handleSort = (posts) => {
    setPosts(posts);
  };

  const removeTopic = (id) => {
    const newPosts = [...posts];
    const index = newPosts.findIndex((p) => p.id === id);
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  const toggleLike = (id) => {
    const newPosts = [...posts];
    const index = newPosts.findIndex((p) => p.id === id);
    newPosts[index].liked = !newPosts[index].liked;
    setPosts(newPosts);
  };

  return (
    <Wrapper>
      <ButtonsGroup fetchPost={fetchPost} />
      <List
        toggleLike={toggleLike}
        removeTopic={removeTopic}
        posts={posts}
        loading={loading}
        handleSort={handleSort}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 128rem;
  margin: 0 auto;
`;
