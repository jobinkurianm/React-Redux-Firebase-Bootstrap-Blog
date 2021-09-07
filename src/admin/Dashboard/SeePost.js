import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  doComment,
  doReply,
  getPosts,
  deleteComment,
} from "../../redux/actionCreators/postsActionCreator";
import AddReply from "./AddReply";

const SeePost = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const { posts, postsLoading, isLoggedIn, user, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const currentPost = posts.find((post) => post.postId === id && post);
  const [replyBox, setReplyBox] = useState([]);
  const [showReplies, setShowReplies] = useState([]);
  useEffect(() => {
    if (postsLoading) {
      dispatch(getPosts());
    }
  }, [dispatch]);

  const replyBoxSet = (data, id) => {
    if (!isLoggedIn) {
      return toast.warning("Please login");
    }
    setReplyBox(
      currentPost.post.comments.map((reply, i) => (i === id ? data : false))
    );
  };
  const showRepliesSet = (data, id) => {
    setShowReplies(
      currentPost.post.comments.map((reply, i) => (i === id ? data : false))
    );
  };

  const makeComment = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (!comment) {
        return toast.warning("Please add comment!");
      }
      const data = {
        name: user.displayName,
        email: user.email,
        comment,
        replies: [],
        admin: true,
        userId,
        postOwner: currentPost.post.author === userId,
      };
      setComment("");

      await dispatch(
        doComment(currentPost.postId, currentPost.post.comments, data)
      );
      return toast.success("Comment added Successfully!");
    }else{
      return toast.warning("Please login to comment!");
    }

    if (!name || !email || !comment) {
      return toast.warning("Please fill in all fields!");
    }
    const data = {
      name,
      email,
      comment,
      replies: [],
      admin: false,
      userId: null,
      postOwner: false,
    };
    setComment("");
    setEmail("");
    setName("");
    await dispatch(
      doComment(currentPost.postId, currentPost.post.comments, data)
    );
    toast.success("Comment added Successfully!");
  };

  const handleReply = async ({ i, reply }) => {
    let data = {};
    if (isLoggedIn) {
      if (!reply.reply) return toast.warning("Please add Reply!");
      data = {
        name: user.displayName,
        email: user.email,
        reply: reply.reply,
        admin: true,
        userId,
        postOwner: currentPost.post.author === userId,
      };
    } else {
      if (!reply.reply || !reply.email || !reply.name)
        return toast.warning("Please fill in all fields!");
      data = {
        name: reply.name,
        email: reply.email,
        reply: reply.reply,
        admin: false,
        userId: null,
        postOwner: false,
      };
    }
    const postId = id;
    await dispatch(doReply(i, postId, currentPost.post.comments, data));
    toast.success("Reply added Successfully!");
  };

  return (
    <div className="container">
      {postsLoading ? (
        <h1 className="text-center">Post Loading...</h1>
      ) : currentPost ? (
        <div className="row pt-3">
          <div className="col-md-12">
          <div className="card-img-wrap-expanded">
            <img
              className="img-fluid" 
              src={currentPost.post.image}
              alt={currentPost.post.title}
            />
            </div>
          </div>
          <div className="row p-5 mb-3">
            <div className="col-md-6">
              <h1 className="display-4 text-capitalize">
                {currentPost.post.title}
              </h1>
              <div className="d-flex align-items-center">
                {currentPost.post.category.split(",").map((category, id) => (
                  <p key={id} className="bg-primary px-2 py-1 text-white">
                    {category.trim()}
                  </p>
                ))}
              </div>
              <p className="card-text py-3 text-justify">
                {currentPost.post.description}
              </p>
            </div>
            <div className="col-md-6 justify-content-end">
              <div className="comments w-75 py-3 mt-2 ml-auto">
              
                  <form onSubmit={makeComment}>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Add Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary my-2">
                        Add Comment
                      </button>
                    </div>
                  </form>
 
                {currentPost.post.comments.length > 0 ? (
                  currentPost.post.comments.map((comment, id) => (
                    <div key={id + 100}>
                      <form className="px-3 my-3 mb-2 py-3 card">
                        <div className="d-flex align-items-center justify-content-between profile">
                          <div className="col-md-6 d-flex">
                            <div className="col-md-3 rounded-circle py-3 text-center bg-dark text-white text-uppercase d-flex align-items-center justify-content-center">
                              {comment.name.split(" ").length < 2
                                ? comment.name[0] + comment.name[1]
                                : comment.name.split(" ")[0][0] +
                                  comment.name.split(" ")[1][0]}
                            </div>
                            <div className="ml-2 mt-1">
                              <h5 className="card-title mb-0 text-capitalize">
                                {comment.name}
                              </h5>
                              <a
                                className="small"
                                href={`mailto:${comment.email}`}
                              >
                                {comment.email}
                              </a>
                            </div>
                          </div>
                          {comment.admin ? (
                            comment.postOwner ? (
                              <div className="d-flex col-md-4 mr-3">
                                <p className="small bg-dark text-white py-1 px-2 ml-auto">
                                  Owner
                                </p>
                                <p className="small bg-dark text-white py-1 px-2 ml-2">
                                  Admin
                                </p>
                              </div>
                            ) : (
                              <p className="small bg-dark text-white py-1 px-2">
                                Admin
                              </p>
                            )
                          ) : null}
                        </div>
                        <div className="form-group py-3 px-3">
                          <p className="card-text">{comment.comment}</p>
                        </div>
                        <p
                          className="bg-dark text-center mx-3 py-2 px-3 text-white"
                          style={{ width: "100px" }}
                        >
                          Replies
                        </p>
                        <div className="form-group px-3">
                          {showReplies[id] === true ? (
                            comment.replies.length > 0 ? (
                              <>
                                {comment.replies.map((rply, i) => (
                                  <>
                                    <div
                                      className={`form-group my-2 d-flex align-items-center justify-content-between profile py-3`}
                                      key={i}
                                    >
                                      <div className="col-md-6 d-flex">
                                        <div className="col-md-4 rounded-circle py-3 text-center bg-dark text-white text-uppercase">
                                          {rply.name.split(" ").length < 2
                                            ? rply.name[0] + rply.name[1]
                                            : rply.name.split(" ")[0][0] +
                                              rply.name.split(" ")[1][0]}
                                        </div>
                                        <div className="ml-2 mt-1">
                                          <h5 className="card-title mb-0 text-capitalize">
                                            {rply.name}
                                          </h5>
                                          <a
                                            className="small"
                                            href={`mailto:${rply.email}`}
                                          >
                                            {rply.email}
                                          </a>
                                        </div>
                                      </div>
                                      {rply.admin ? (
                                        rply.postOwner ? (
                                          <div className="d-flex col-md-4">
                                            <p className="small bg-dark text-white py-1 px-2 ml-auto">
                                              Owner
                                            </p>
                                            <p className="small bg-dark text-white py-1 px-2 ml-2">
                                              Admin
                                            </p>
                                          </div>
                                        ) : (
                                          <p className="small bg-dark text-white py-1 px-2">
                                            Admin
                                          </p>
                                        )
                                      ) : null}
                                    </div>
                                    <div className="col-md-12 pb-5 border-bottom">
                                      {rply.reply}
                                    </div>
                                  </>
                                ))}

                                <button
                                  type="button"
                                  className="btn text-primary"
                                  onClick={() => showRepliesSet(false, id)}
                                >
                                  Hide Replies
                                </button>
                              </>
                            ) : (
                              <p className="card-text">No Replies</p>
                            )
                          ) : comment.replies.length > 0 ? (
                            <button
                              type="button"
                              className="btn text-primary"
                              onClick={() => showRepliesSet(true, id)}
                            >
                              view {comment.replies.length} replies
                            </button>
                          ) : (
                            <p className="card-text">No Replies</p>
                          )}
                        </div>
                        <div className="form-group px-3">
                          {replyBox[id] === true ? (
                            <AddReply
                              id={id}
                              handleReply={handleReply}
                              replyBoxSet={replyBoxSet}
                            />
                          ) : (
                            <button
                              type="button"
                              className="btn text-primary"
                              onClick={() => replyBoxSet(true, id)}
                            >
                              Reply
                            </button>
                          )}
                        </div>
                        {isLoggedIn && currentPost.post.author === userId && (
                          <div className="col-md-12">
                            <button
                              type="button"
                              className="text-danger btn"
                              onClick={async () => {
                                await dispatch(
                                  deleteComment(
                                    id,
                                    currentPost.postId,
                                    currentPost.post.comments
                                  )
                                );
                                toast.success("Comment Deleted Successfully!");
                              }}
                            >
                              Delete Comment
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  ))
                ) : (
                  <h1 className="card-heading my-3">No comments</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">
          Post with id <span className="text-primary">{id}</span> does not
          exists
        </h1>
      )}{" "}
    </div>
  );
};

export default SeePost;
