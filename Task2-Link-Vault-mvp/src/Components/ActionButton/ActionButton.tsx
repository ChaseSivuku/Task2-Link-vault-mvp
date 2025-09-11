import React from 'react'
import styles from './ActionButton.module.css'

type Props = {
    text: string,
    iconURL: string
}

export const ActionButton: React.FC <Props> = ({text, iconURL}) => {
  return (
    <>
     <div className={styles.container}>
        <button>
            <div className={styles.icon}><img src={iconURL} alt="icon" /></div>
            <p>{text}</p>
        </button>
     </div>
    </>
  )
}
