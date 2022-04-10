import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Game Tech</title>
        <meta name="description" content="Game tech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <footer className="">gametech 2022</footer>
    </div>
  );
};

export default Home;
