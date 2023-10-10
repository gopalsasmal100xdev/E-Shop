import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Events from "../events/EventCard";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <Events />
      <Footer />
    </div>
  );
};

export default EventsPage;
