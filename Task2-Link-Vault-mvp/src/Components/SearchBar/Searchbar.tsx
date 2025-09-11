import styles from './SearchBar.module.css'

export const Searchbar = () => {
  return (
    <>
        <div className={styles.container}>
            <input type="text" className={styles.search} placeholder='search'/>
            <div className={styles.buttonContainer}>
                <button><img src="/icons/search.png" alt="search" /></button>
            </div>
        </div>
    </>
  )
}
