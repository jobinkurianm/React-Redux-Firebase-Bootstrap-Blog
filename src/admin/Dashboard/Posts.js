import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import PostCard from "./PostCard";

const Posts = () => {
  const { postsLoading, allPosts, userId } = useSelector(
    (state) => ({
      postsLoading: state.posts.postsLoading,
      allPosts: state.posts.posts,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const posts = allPosts.filter((post) => post.post && post.post.author === userId && post);
  useEffect(() => {
    //if (postsLoading) {
      dispatch(getPosts());
    //}
  }, [dispatch]);
  return (
    <div className="container">
      
      <div className="row py-5">
        {postsLoading ? (
          <h1 className="text-center">Loading Posts...</h1>
        ) : posts.length > 0 ? (
          <>
            {posts.map((post, id) => (
              <PostCard post={post} key={id} id={id} />
            ))}
          </>
        ) : (
          <h1 className="text-center">
            You haven't uploaded any post{" "}
            <Link to="/admin/dashboard/addPost" className="ml-2">
              Create Post
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Posts;
