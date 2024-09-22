import { useState } from "react";
import NestedComments from "./components/Nested-comments";
import useModification from "./hooks/useModification";

const App = () => {
  const { commentsData, addComment } = useModification();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addCommentTop = (value) => {
    addComment(value);
    setValue("");
  };

  console.log(commentsData);

  return (
    <div className="">
      <textarea
        className="input"
        onChange={handleChange}
        value={value}
      ></textarea>
      <button onClick={() => addCommentTop(value)}>Add Comment</button>
      <NestedComments data={commentsData} addComment={addComment} />
    </div>
  );
};

export default App;
