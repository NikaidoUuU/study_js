import React from 'react';
import PostContainer from '../containers/PostContainer';

const PostPage = ({ match }) => {
  const { id } = match.params;

  return <PostContainer postId={Number(id)} />;
}

export default PostPage;