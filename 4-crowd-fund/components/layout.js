import { Container } from "semantic-ui-react";
import Header from "./header";
import Head from "next/head";

export default (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
