import React from 'react'
import styles from './HeadingBar.module.css'

type Props = {
    heading: string
}

export const Headingbar: React.FC <Props> = ({heading}) => {
  return (
    <>
        <div className={styles.container}>
            <h2 className={styles.heading}>{heading}</h2>
        </div>
    </>
  )
}
