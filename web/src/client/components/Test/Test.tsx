import { FC } from "react"

import styles from './Test.module.scss'

export const Test: FC = () => {
  return <div className={styles.test}>Test<div className={styles.check}>as</div></div>
}
