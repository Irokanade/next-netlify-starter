import styles from './IntroHeader.module.css'

export default function IntroHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>My Seattle Guide</h1>
        <p className={styles.subtitle}>
          Little spots I&apos;m collecting as I start at Northeastern — libraries to
          study in, and pretty places to wander.
        </p>
      </div>
      <div className={styles.deco} aria-hidden="true">
        <span className={styles.dot} style={{ background: 'var(--pastel-pink)' }} />
        <span className={styles.dot} style={{ background: 'var(--pastel-mint)' }} />
        <span className={styles.dot} style={{ background: 'var(--pastel-peach)' }} />
      </div>
    </header>
  )
}
