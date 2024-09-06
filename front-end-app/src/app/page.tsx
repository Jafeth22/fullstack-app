import styles from "./page.module.css";
import Cities from "@/components/cities/cities";
import Navbar from "@/components/navbar/navbar";
import { Label } from "@/components/ui";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainPage}>
          <Label>This my Full Stack App, with NextJs, NextJs, Docker and PostgreSQL</Label>
        </div>
      </main>
    </>
  );
}
