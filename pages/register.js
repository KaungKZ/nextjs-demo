import React from "react";
import Head from "next/head";

import Register from "../components/Register";

export default function register() {
  // console.log(switches);

  return (
    <>
      <Head>
        <title>NextJS - Demo App</title>

        <meta property="og:title" content="NextJS - Demo App" />
        <meta name="description" content="Demo App" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
      </Head>
      <Register></Register>
    </>
  );
}
