import React from "react";
import { db } from "../../lib/firebase";



const Blog = () => {
  console.log("🛠 Firebase DB:", db);
  return <div>Blog</div>;
};

export default Blog;
