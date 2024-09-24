import { useEffect } from "react";
import "./post.css";

const Post = ({ post, setPageNo }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (params) => {
        if (params[0].isIntersecting) {
          observer.unobserve(params[0].target);
          setPageNo((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );
    if (post.length <= 0) return;
    const target = document.querySelector(".image-container:last-child");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [post, setPageNo]);

  return (
    <div className="post-container">
      {post.length > 0 &&
        post.map((item) => (
          <div className="image-container" key={item.id}>
            <img
              src={item.download_url}
              alt={item.author}
              className="scroll-image"
            />
          </div>
        ))}
    </div>
  );
};

export default Post;
