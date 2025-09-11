import React from "react";
import styles from "./LinkCard.module.css";

type Props = {
  url: string
  title: string;
  description: string;
  tags?: string[];
};

export const LinkCard: React.FC<Props> = ({ title, description, tags }) => {
  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.infoDiv}>
          <div className={styles.descriptionDiv}>
            <p className={styles.descriptionText}>{description}</p>
            <div className={styles.tagsDiv}>
              {tags?.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
            <button className={styles.showMoreButton}>show more...</button>
          </div>
          <div className={styles.iconsDiv}>
            <ul>
              <li>
                <img src="/icons/edit.png" alt="" />
              </li>
              <li>
                
                <img src="/icons/delete.png" alt="" />
              </li>
              <li>
                <img src="/icons/visit.png" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
