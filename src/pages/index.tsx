import Head from "next/head";
import { Inter } from "@next/font/google";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Cesium Map Playground</title>
      </Head>
      <Map />
    </>
  );
}
