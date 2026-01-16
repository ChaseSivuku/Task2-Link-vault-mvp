import styles from './SearchBar.module.css'

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Searchbar = ({ value, onChange }: Props) => {
  return (
    <>
        <div className={styles.container}>
            <input 
              type="text" 
              className={styles.search} 
              placeholder='search'
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <div className={styles.buttonContainer}>
                <button type="button"><img src="/icons/search.png" alt="search" /></button>
            </div>
        </div>
    </>
  )
}
