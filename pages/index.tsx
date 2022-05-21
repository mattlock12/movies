import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Society is crumbling but at least we can stream it</title>
        <meta name="description" content="Movies" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Media reviews</h1>
        <h2>Watching movies while watching the world burn</h2>
        <div>
          Come, join me and watch some
          <Link href="/movies">
            <a className={styles.link}> Movies</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
