import Image from "next/image";
import logo from "../public/i6o.svg";

export default function Footer() {
  return (
    <>
      <footer>
        <a href="https://i6o.fi" target="_blank" rel="noopener noreferrer">
          Coded by
          <Image
            src={logo}
            height={100}
            alt="i6o - Leaning the Future"
            className="logo"
          />
        </a>
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #aeaeae;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .logo {
          height: 6em;
        }
      `}</style>
    </>
  );
}
