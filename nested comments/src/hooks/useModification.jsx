import { useState } from "react";
import data from "../data/data.json";

const useModification = () => {
  const [commentsData, setData] = useState(data);

  const findParent = (parentId, newComment, prev) => {
    const res = prev.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies.length > 0) {
        // we have to find parent in replies
        return {
          ...comment,
          replies: findParent(parentId, newComment, comment.replies),
        };
      } else {
        return comment;
      }
    });

    return res;
  };

  const addComment = (value, parentId = null) => {
    if (!value || value.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    const newComment = {
      id: new Date().getUTCMilliseconds(),
      content: value,
      replies: [],
    };

    if (!parentId) {
      setData([...commentsData, newComment]);
      return;
    }

    // we have to find first parent
    const res = findParent(parentId, newComment, commentsData);
    setData(res);
  };

  return { commentsData, addComment };
};

export default useModification;
