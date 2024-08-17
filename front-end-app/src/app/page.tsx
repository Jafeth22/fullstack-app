import styles from "./page.module.css";
import Cities from "@/components/cities/cities";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Cities />
      </main>
    </>
  );
}
