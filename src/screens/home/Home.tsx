import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/routes";
import { Button, Input } from "../../shared/ui";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.EXERCISE);
  };

  return (
    <div>
      Home
      <Button onClick={handleClick}>click</Button>
      <br />
      <br />
      <Input type="email" />
      <br />
      <br />
      <Input type="password" />
      <br />
      <br />
      <Input />
    </div>
  );
};

export default Home;
