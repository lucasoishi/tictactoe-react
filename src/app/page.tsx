import { Button } from "@mui/material";
import Board from "./board";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div> <Board></Board> </div>
      </main>
    </div>
  );
}
