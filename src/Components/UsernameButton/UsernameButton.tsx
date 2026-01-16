import React from 'react'
import styles from './Username.module.css'

type Props = {
    username: string,
    url: string
}

export const UsernameButton: React.FC <Props> = ({username, url}) => {
  return (
    <div className={styles.container}>
        <button>
            <p>{username}</p>
            <div className={styles.image}>
                <img src={url} alt="U" />
            </div>
        </button>
    </div>
  )
}
