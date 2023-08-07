import PageNav from "../components/PageNav";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Save electricity save earth.
          <br />
          Ecolife keeps track of your carbon footprint.
        </h1>
        <h2></h2>
      </section>
    </main>
  );
}
