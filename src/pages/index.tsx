import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChalleng } from '../components/CompletedChalleng';
import { Countdown } from '../components/Coutdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css'

import Head from 'next/head';
import { CountdonwProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import { ChallengeProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengeCompleted: number

}

export default function Home(props: HomeProps) {

  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it - Homologação</title>
        </Head>
        <ExperienceBar />
        <CountdonwProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalleng />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdonwProvider>
      </div>
    </ChallengeProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { level, currentExperience, challengeCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}