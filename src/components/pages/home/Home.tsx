import TopBar from "@components/layout/TopBar";
import { useEffect, useRef, useState } from "react";
import Today from "./Today";
import Week from "./Week";

const Home = () => {
  return (
    <div>
      <TopBar title="구그램" back={true} qIcon={true} icon={true} />
      <Week />
      <Today />
    </div>
  );
};

export default Home;
