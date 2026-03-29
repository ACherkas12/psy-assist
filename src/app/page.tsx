import styles from "./page.module.css";
import { Chat } from "./components/chat/chat";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chat />
      </main>
    </div>
  );
};

export default Home;
