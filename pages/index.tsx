import Head from 'next/head';
import { useState, ChangeEvent, useEffect, useCallback } from 'react';
import styles from '../styles/Home.module.css';
import CarView from '../components/CarView';

const LOCAL_STORAGE_VERIFIED = 'gothfrapp_verified';

const errorMessages = [
  'not it',
  'sorry, hun 💅',
  '👁👄👁',
  "don't have the key so you can't unlock it",
  'SKSKSKSKSKSKSKS',
  "don't bother sweaty",
  'getting warmer 🔥',
  'it\'s the lack of knowing the password for me',
  'Edward Snowden 🧑🏻‍💻🔐💽 is typing...',
  '🥺👉👈'
];

// loadTheme({
//   palette: {
//     themePrimary: '#94385b',
//     themeLighterAlt: '#fbf4f7',
//     themeLighter: '#eed6df',
//     themeLight: '#dfb5c5',
//     themeTertiary: '#bf7893',
//     themeSecondary: '#a1496b',
//     themeDarkAlt: '#853352',
//     themeDark: '#702b45',
//     themeDarker: '#531f33',
//     neutralLighterAlt: '#e5e2e9',
//     neutralLighter: '#e1dfe5',
//     neutralLight: '#d8d5dc',
//     neutralQuaternaryAlt: '#c9c7cd',
//     neutralQuaternary: '#c0bec4',
//     neutralTertiaryAlt: '#b8b6bc',
//     neutralTertiary: '#bb9fac',
//     neutralSecondary: '#a48594',
//     neutralPrimaryAlt: '#8e6c7c',
//     neutralPrimary: '#351e29',
//     neutralDark: '#624151',
//     black: '#4c2f3d',
//     white: '#eae7ef',
//   },
// });

export default function Home() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pseudoLoggedIn, setPseudoLoggedIn] = useState(false);
  const [localStorageEnabled, setLocalStorageEnabled] = useState(false);

  useEffect(() => {
    if ('localStorage' in window) setLocalStorageEnabled(true);
    if (
      'localStorage' in window &&
      localStorage.getItem(LOCAL_STORAGE_VERIFIED) === 'sure, Jan'
    ) {
      setPseudoLoggedIn(true);
    }
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value ?? '');
  };

  const verifyPassword = useCallback(() => {
    if (password === process.env.NEXT_PUBLIC_PSEUDO_PASSWORD) {
      if (localStorageEnabled) {
        localStorage.setItem(LOCAL_STORAGE_VERIFIED, 'sure, Jan');
      }
      setError('');
      setPseudoLoggedIn(true);
    } else {
      setError(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
    }
  }, [password, localStorageEnabled]);

  const destroyStorage = () => {
    if (localStorageEnabled) {
      localStorage.removeItem(LOCAL_STORAGE_VERIFIED)
    }
    setPseudoLoggedIn(false)
    setPassword('')
    setError('bye hun x')
  }

  return (
    <div>
      <Head>
        <title>𝖌𝖔𝖙𝖍 𝖋𝖗𝖆𝖕𝖕</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap"
        />
      </Head>
      <div className={styles.header}>
        <span className={styles.goth}>🧚</span>
        <h1>gothfr.app</h1>
      </div>
      {pseudoLoggedIn ? (
        <CarView onLogout={destroyStorage}/>
      ) : (
        <div className={styles.login}>
          <h2 className={styles.loginTitle}>password?</h2>
          <div className={styles.controls}>
            <input
              onChange={handleInput}
              value={password}
              className={styles.input}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  verifyPassword()
                }
              }}
            />
            <button onClick={verifyPassword} className={styles.button}>
              🔓
            </button>
          </div>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      )}
    </div>
  );
}
