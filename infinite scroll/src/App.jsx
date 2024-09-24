import { useEffect } from "react";
import { useState } from "react";
import Post from "./components/Posts/Post";

const App = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`).then(
      async (res) => {
        const _data = await res.json();
        setData((prev) => [...prev, ..._data]);
      }
    );
  }, [pageNo]);

  return (
    <div>
      <Post post={data} setPageNo={setPageNo} />
    </div>
  );
};

export default App;
