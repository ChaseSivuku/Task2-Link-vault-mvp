import React, { type ReactNode } from 'react'
import styles from './HeadingBar.module.css'

type Props = {
    heading: string,
    child1?: ReactNode,
    child2?: ReactNode
}

export const Headingbar: React.FC <Props> = ({heading, child1, child2}) => {
  return (
    <>
        <div className={styles.container}>
          {child1}
          <h2 className={styles.heading}>{heading}</h2>
          {child2}
        </div>
    </>
  )
}
