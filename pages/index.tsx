import type { NextPage } from "next";
import Head from "next/head";
import { Example } from "src/components/organisms/example";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Starter</title>
        <meta
          name="description"
          content="Example project with a starting setup of packages and components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Example />
    </div>
  );
};

export default Home;
