import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/scenes/1_club_entrance.png"
          alt="Next.js logo"
          width={900}
          height={900}
          priority
        />
       
   </main>
  );
}
