'use client'

import { GameProvider } from "@/context/gameContext";
import styles from "./page.module.css";
import { GameContainer } from "@/components/gameContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameProvider>
          <GameContainer />
        </GameProvider>
      </main>
    </div>
  );
}
