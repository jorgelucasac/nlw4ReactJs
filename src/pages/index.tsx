import { CompletedChalleng } from '../components/CompletedChalleng';
import { Countdown } from '../components/Coutdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css'

import Head from 'next/head';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChalleng />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  )
}
