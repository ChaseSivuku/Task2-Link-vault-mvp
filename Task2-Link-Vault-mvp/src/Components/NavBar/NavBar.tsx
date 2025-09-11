import React, { type ReactNode } from 'react'
import styles from './navBar.module.css'

type Props = {
    child?: ReactNode
}

export const NavBar: React.FC <Props> = ({child}) => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.logo}><img src="/logo/logo.png" alt="Logo" /></div>
            {child}
        </div>
    </>
  )
}
