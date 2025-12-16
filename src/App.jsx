import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import CreateBlog from "./pages/CreateBlog";
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="/create-blog" element={<CreateBlog />} />
<Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
