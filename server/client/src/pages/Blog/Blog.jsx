import { blogData } from "../../utils/fakedata";
import { BsArrowRightShort } from "react-icons/bs";
import { AppDownload, Footer, NewsLetter } from "../../components";
import { Helmet } from "react-helmet";
const Blog = () => (
  <section className="blog-main">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Blog</title>
    </Helmet>
    <div className="title">
      <h2>Blog</h2>
    </div>

    <div className="blog container-div">
      <div className="blog__items grid">
        {blogData.map((blog) => (
          <div key={blog.id} className="blog__items__item">
            <div>
              <img src={blog.img} alt="" />
              <span>{blog.author}</span>
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <button>
                Read More <BsArrowRightShort />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <NewsLetter />
    <AppDownload />
    <Footer />
  </section>
);

export default Blog;
