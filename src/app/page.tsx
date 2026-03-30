import { Chat } from "./components/chat/chat";
import sx from "./page.module.css";

const Home = () => {
  return (
    <div className={sx.page}>
      <main className={sx.main}>
        <Chat />
      </main>
    </div>
  );
};

export default Home;
