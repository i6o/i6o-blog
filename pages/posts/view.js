import Head from "next/head";
import { createClient } from "redis";
import Footer from "../../components/footer";
import markdownStyles from "./markdown-styles.module.css";

export async function getServerSideProps(context) {
  const client = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  });
  await client.connect();
  client.on("error", (err) => console.log("Redis Client Error", err));

  const lresults = await client.lRange("posts", 0, -1);
  var posts = [];

  lresults.forEach((result) => {
    posts.push(JSON.parse(result));
  });
  return {
    props: {
      posts: posts,
    }, // will be passed to the page component as props
  };
}

export default function View({ posts }) {
  function BlogPosts() {
    return (
      <>
        <div className="grid">
          {posts.map((post) => {
            return (
              <>
                <div className="card">
                  <h3>{post.title}</h3>
                  <code>
                    {post.author} @{" "}
                    {new Date(post.timestamp).toLocaleString("fi")}
                  </code>
                </div>
                <div className="blog">
                  <div
                    className={markdownStyles["markdown"]}
                    dangerouslySetInnerHTML={{ __html: post.blog }}
                  />
                </div>
              </>
            );
          })}
        </div>
        <style jsx>{`
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 95%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
            color: #0070f3;
            border-color: #0070f3;
            background-color: #eaf2ea;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
          .blog {
            margin-bottom: 5rem;
          }

          @media (max-width: 800px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </>
    );
  }
  return (
    <div className="container">
      <Head>
        <title>Latest blog posts!</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1 className="title">Latest Blog Posts!</h1>

        <p className="description">These are the latest open blog posts.</p>

        <BlogPosts />
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0eeee;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        @media (max-width: 800px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
