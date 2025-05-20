import { useParams } from "react-router-dom";

const Report = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Отчет по заданию {id}</h1>
      <div>
        <div>
          <h2>График КАКИЕ по дням</h2>
        </div>
        <div>
          <h2>День / часы</h2>
        </div>
        <div>
          <h2>???</h2>
        </div>
      </div>
    </div>
  );
};

export default Report;
