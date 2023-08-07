import PageNav from "../components/PageNav";
import styles from "./Aboutus.module.css";

export default function Aboutus() {
  return (
    <main className={styles.aboutus}>
      <PageNav />
      <div></div>
      <section>
        <h1>
          Welcome to our Ecolife!
          <br />
        </h1>
        <p>
          At Ecolife, we are dedicated to promoting sustainability and
          empowering individuals to take meaningful actions towards reducing
          their carbon footprint. Our Carbon Footprint Calculator is designed to
          provide you with valuable insights into your environmental impact,
          helping you make informed decisions and contribute to a greener
          future.
        </p>
        <h2>
          Our Mission:
          <br />
        </h2>

        <p>
          At Ecolife, our mission is to raise awareness about the importance of
          environmental responsibility and inspire positive change. We believe
          that every small action counts and that together, we can make a
          significant impact on the health of our planet.
        </p>
      </section>
    </main>
  );
}
