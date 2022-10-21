import Head from "next/head";
import Footer from "../../components/footer";
export default function New() {
  return (
    <div className="container">
      <Head>
        <title>My Open Blog! - New Post</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <h1 className="title">New blog post</h1>

        <div className="disclaimer">
          <p className="description">
            This is an open blog. Any views or opinions represented in this blog
            are personal and belong solely to the blog author and do not
            represent those of people, institutions or organizations that the
            owner may or may not be associated with in professional or personal
            capacity, unless explicitly stated.
            <p />
            Any views or opinions are not intended to malign any religion,
            ethnic group, club, organization, company, or individual. All
            content provided on this blog is for informational purposes only.
            <p />
            The owner of this blog makes no representations as to the accuracy
            or completeness of any information on this site or found by
            following any link on this site.
            <p />
            The owner will not be liable for any errors or omissions in this
            information nor for the availability of this information. The owner
            will not be liable for any losses, injuries, or damages from the
            display or use of this information.
          </p>
        </div>

        <form action="/api/add" method="post">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required minLength={5} />
          <label for="blog">Blog text:</label>
          <textarea rows={5} id="blog" name="blog" required minLength={10} />
          <button type="submit">Submit</button>
        </form>
      </main>
      <Footer />
      <style jsx>{`
        .container {
          min-height: 50vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0eeee;
        }

        .disclaimer {
          background-color: #f26969;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-padding: 10rem;
          max-width: 80%;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        main {
          padding: 2rem 0;
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
          text-align: center;
        }

        .description {
          line-height: 1.2rem;
          font-size: 0.8rem;
          text-align: top;
          margin: 1rem;
        }

        form {
          width: 80%;
          color: #333333;
          padding: 1rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
        }

        label {
          margin: 0;
          font-size: 1.2rem;
          text-align: left;
          color: #333333;
          padding: 0rem 1rem;
          justify-content: center;
          align-items: left;
          margin-bottom: 0.1rem;
        }

        input,
        textarea {
          width: 100%;
          border: 1px solid #0e0e0e;
          border-radius: 1rem;
          color: #333333;
          padding: 1rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          margin-bottom: 2rem;
        }

        button {
          height: 38px;
          width: 243px;
          border-radius: 2rem;
          background-color: #89b4e5;
          border-color: #414770;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
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
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
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
