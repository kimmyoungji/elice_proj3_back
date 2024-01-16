import TopBar from "@components/layout/TopBar";
import Week from "./Week";

const Home = () => {
  return (
    <div>
      <TopBar
        home={true}
        title="구그램"
        back={false}
        qIcon={false}
        icon={false}
      />
      <Week />
    </div>
  );
};

export default Home;
