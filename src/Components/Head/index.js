import Head from "next/head";

export default function CustomHead({
  title = "",
  icoPath = "/images/favicon.icon",
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href={icoPath} />
    </Head>
  );
}
