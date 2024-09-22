/* eslint-disable */

import { useState } from "react";
import Comment from "./Comment";
import "./styles.css";

const NestedComments = ({ data, addComment }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id, disable = false) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
  };

  return (
    <div>
      {data?.length > 0 &&
        data.map((comment) => (
          <div className="nested-wrapper">
            <Comment
              key={comment.id}
              comment={comment}
              toggleExpanded={toggleExpanded}
              replies={comment?.replies.length}
              addComment={addComment}
            />
            {expandedId === comment.id && comment?.replies?.length > 0 && (
              <NestedComments data={comment.replies} addComment={addComment} />
            )}
          </div>
        ))}
    </div>
  );
};

export default NestedComments;
