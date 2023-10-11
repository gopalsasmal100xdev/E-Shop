import Confetti from "./Confetti";

// eslint-disable-next-line react/prop-types
const ViewConfetti = ({ isVisible }) => {
  return <>{isVisible ? <Confetti /> : <></>}</>;
};

export default ViewConfetti;
