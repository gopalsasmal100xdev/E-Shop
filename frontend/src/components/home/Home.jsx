import { Header } from "../../components";
import BestDeals from "./BestDeals/BestDeals";
import Categories from "./categories/Categories";
import Hero from "./hero/Hero";

const Home = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
    </div>
  );
};

export default Home;
