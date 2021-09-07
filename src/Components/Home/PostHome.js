import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { postDel } from "../../redux/actionCreators/postsActionCreator";
import { Link } from "react-router-dom";

const PostHome = ({ post, id,isLoggedIn,userId }) => {
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

      <div className="ccard-footer d-flex align-items-center justify-content-between bg-white border-0">
            {isLoggedIn && post.post.author === userId ? (
              <>
                <Link
                  to={`/post/${post.postId}/${post.post.title}`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-eye"></i> See Post
                </Link>
                <div className="btns">
                  <Link
                    to={`/admin/dashboard/post/${post.postId}/edit`}
                    className="btn btn-outline-primary mr-2"
                  >
                    <i className="fa fa-pencil"></i> Manage Post
                  </Link>
                </div>
              </>
            ) : (
              <Link
                to={`/post/${post.postId}/${post.post.title}`}
                className="btn btn-block btn-primary"
              >
                <i className="fa fa-eye"></i> See Post
              </Link>
            )}
          </div>
      </div>
    </div></div>
  );
};

export default PostHome;
