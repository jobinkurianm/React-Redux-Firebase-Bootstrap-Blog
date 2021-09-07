import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { postDel } from "../../redux/actionCreators/postsActionCreator";

const PostCard = ({ post, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const postDelete = () => {
    dispatch(postDel(post.postId));
    toast.success("Post deleted successfully!");
  };
  return (
    <div className="col-sm-6 col-md-4 mb-5">
    <div className="card" key={id}>
      <div className="card-img-wrap">
      <img 
        src={post.post.image}
        alt={post.post.title}
      /></div>
      <div className="card-body p-4 text-justify">
        <h5 className="card-title">{post.post.title.toUpperCase()}</h5>
        <p className="card-text">
          {post.post.description.substring(0, 100)}...
        </p>
      </div>
      <div className="card-footer p-4 bg-white">
        <div className="d-flex align-items-center my-2 justify-content-between">

          <p className="bg-dark text-white py-1 px-2">{post.post.postedBy}</p>
        </div>
        <div className="">
          <button
            className="btn btn-primary  my-2 btn-block"
            onClick={() => history.push(`/admin/dashboard/post/${post.postId}`)}
          >
            <i className="fa fa-eye"></i> See Post
          </button>
          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                history.push(`/admin/dashboard/post/${post.postId}/edit`)
              }
              className="btn btn-outline-primary  my-2  mx-1"
            >
              <i className="fa fa-pencil"></i> Edit Post
            </button>
            <button
              type="button"
              onClick={postDelete}
              className="btn btn-danger my-2ss"
            >
              <i className="fa fa-trash-o"></i> Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PostCard;
