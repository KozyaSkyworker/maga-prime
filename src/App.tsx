import styles from "./App.module.css";

// TODO:
// иконки (внутри приложения)
// шрифты
// скругления

function App() {
  return (
    <div className={styles.app}>
      <h1>Экзаменнационное задание</h1>
      <p>
        Время в работе: <span>1ч 24мин</span>
      </p>
      <div className={styles.app__line}></div>
      <div>
        <p>
          <span>78%</span> - релевантный контент
        </p>
        <p>
          До дедлайна: <span>2</span> дня
        </p>
      </div>
      <div className={styles.app__divider}></div>
      <div>
        <h2>Последние сайты:</h2>
        <ul>
          <li>first</li>
          <li>second seconds</li>
          <li>third third third third third</li>
          <li>fourth fourth fourth</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
