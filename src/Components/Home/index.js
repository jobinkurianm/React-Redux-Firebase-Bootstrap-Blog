import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import PostHome from "./PostHome";
const Home = () => {
  const { posts, postsLoading, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const latestPosts = posts;
  latestPosts
    .sort((a, b) => {
      const postA = new Date(a.post.createdAt);
      const postB = new Date(b.post.createdAt);

      if (postA < postB) return 1;
      if (postA > postB) return -1;
      return 0;
    })
    .slice(0, 5);

  const dispatch = useDispatch();
  useEffect(() => {
    if (postsLoading) {
      dispatch(getPosts());
    }
  }, [dispatch]);
  return (
    <div>
  <main className="container">
      <div className="row">
        {postsLoading ? (
          <h1 className="text-center">Loading Posts...</h1>
        ) : posts.length > 0 ? (
          <>
            {latestPosts.map((post, id) => (
              <PostHome isLoggedIn={isLoggedIn} userId={userId} post={post} key={id} id={id} />
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
  </main>
  <footer className="blog-footer">
  <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a>.</p>
  <p>
    <a href="#">Back to top</a>
  </p>
</footer>
</div>
  );
};

export default Home;
