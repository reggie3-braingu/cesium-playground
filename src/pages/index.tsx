import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cesium Map Playground</title>
      </Head>
      <Container>
        <Link href="/cesiumMap">
          <Typography>Cesium Map</Typography>
        </Link>
        <Link href="/leafletMap">
          <Typography>Leaflet Map</Typography>
        </Link>
      </Container>
    </>
  );
}
