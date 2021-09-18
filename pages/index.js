import Head from "next/head";
// import { useEffect, useState } from "react";

import Error from "next/error";
import Home from "../components/Home";

export default function Index(props) {
  // console.log(props.data);

  return (
    <>
      <Head>
        <title>NextJS - Demo App</title>

        <meta property="og:title" content="NextJS - Demo App" />
        <meta name="description" content="Demo App" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
      </Head>
      <Home></Home>
    </>
  );
}

export async function getStaticProps() {
  // const client = new ApolloClient({
  //   // uri: "https://api.spacex.land/graphql/",
  //   uri: "https://graphql.shopcat.me/",
  //   cache: new InMemoryCache(),
  // });

  // const { data } = await client.mutate({
  //   mutation: gql`
  //     mutation demo {
  //       signUp(phoneNumber: "09958566153", phoneCountryCode: "95")
  //     }
  //   `,
  // });
  return { props: { data: null } };
}
