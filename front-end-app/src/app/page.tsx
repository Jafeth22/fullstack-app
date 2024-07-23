import Image from "next/image";
import styles from "./page.module.css";
import Cities from "@/components/cities/cities";

export default function Home() {
  return (
    <main className={styles.main}>
      <Cities />
    </main>
  );
}
