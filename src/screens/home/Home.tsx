import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.EXERCISE);
  };

  return (
    <div>
      Home
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default Home;
