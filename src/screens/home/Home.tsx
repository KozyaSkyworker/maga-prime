import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes";
import { Button } from "../../shared/ui";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.EXERCISE);
  };

  return (
    <div>
      Home
      <Button onClick={handleClick}>click</Button>
    </div>
  );
};

export default Home;
