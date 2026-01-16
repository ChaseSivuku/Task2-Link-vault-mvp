import React from 'react'
import styles from './ActionButton.module.css'

type Props = {
    text: string,
    iconURL: string
    onClick?: () => void;
}

export const ActionButton: React.FC <Props> = ({text, iconURL, onClick}) => {
  return (
    <>
     <div className={styles.container}>
        <button onClick={onClick}>
            <div className={styles.icon}><img src={iconURL} alt="icon" /></div>
            <p>{text}</p>
        </button>
     </div>
    </>
  )
}
