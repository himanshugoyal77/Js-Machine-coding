/* eslint-disable */

import { useState } from "react";
import useModification from "../hooks/useModification";

const Comment = ({ comment, toggleExpanded, replies, addComment }) => {
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState("");
  console.log(addComment);
  const addCommentTop = () => {
    console.log("addCommentTop");
    if (addComment) {
      addComment(reply, comment.id);
    }
    setReply("");
  };

  return (
    <div className={""}>
      <div>
        <p className="content">{comment?.content}</p>
      </div>
      <div className="actions">
        <button onClick={() => setShow(!show)}>Reply</button>
        <button onClick={() => toggleExpanded(comment.id)}>Show replies</button>
        <span className="replies">{replies} replies</span>
      </div>

      {show && (
        <div className="reply-wrapper">
          <textarea
            className="inner-input"
            onChange={(e) => setReply(e.target.value)}
            value={reply}
          ></textarea>
          <button onClick={() => addCommentTop()}>Add reply</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
