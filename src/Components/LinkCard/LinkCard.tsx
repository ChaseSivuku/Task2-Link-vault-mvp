import React, { useState } from "react";
import styles from "./LinkCard.module.css";

type Props = {
  id?: number | string;
  url: string;
  title: string;
  description: string;
  hashtags: string[]; 
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
};

const MAX_DESCRIPTION_LENGTH = 100;

export const LinkCard: React.FC<Props> = ({
  id,
  url,
  title,
  description,
  hashtags,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded || !shouldTruncate 
    ? description 
    : `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <hr />
      <div className={styles.infoDiv}>
        <div className={styles.descriptionDiv}>
          <p className={styles.descriptionText}>{displayDescription}</p>
          <div className={styles.tagsDiv}>
            {hashtags.map((hashtag, index) => (
              <p key={index}>#{hashtag}</p>
            ))}
          </div>
          {shouldTruncate && (
            <button 
              className={styles.showMoreButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "show less..." : "show more..."}
            </button>
          )}
        </div>

        <div className={styles.iconsDiv}>
          <ul>
            <li>
              <img
                src="/icons/edit.png"
                alt="edit"
                onClick={() => id && onEdit?.(id)} // ✅ call edit handler
                style={{ cursor: onEdit ? "pointer" : "default" }}
              />
            </li>
            <li>
              <img
                src="/icons/delete.png"
                alt="delete"
                onClick={() => id && onDelete?.(id)} // ✅ call delete handler
                style={{ cursor: onDelete ? "pointer" : "default" }}
              />
            </li>
            <li>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img src="/icons/visit.png" alt="visit" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};