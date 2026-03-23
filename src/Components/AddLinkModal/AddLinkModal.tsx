import React, { useState, useEffect } from "react";
import styles from "./AddLinkModal.module.css";

type Props = {
  onClose: () => void;
  onSave: (link: LinkData) => void;
  initialData?: LinkData | null;
};

export type LinkData = {
  id?: number | string;
  title: string;
  description: string;
  hashtags: string[];
  url: string;
};

export const AddLinkModal: React.FC<Props> = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [url, setUrl] = useState(initialData?.url || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setUrl(initialData.url);
    } else {
      setTitle("");
      setDescription("");
      setUrl("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hashtags = description
      .split(/\s+/)
      .filter((word) => word.startsWith("#"))
      .map((tag) => tag.replace("#", ""));

    const linkData: LinkData = {
      ...(initialData?.id && { id: initialData.id }),
      title,
      description,
      hashtags,
      url,
    };

    onSave(linkData);
    setTitle("");
    setDescription("");
    setUrl("");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Edit Link" : "Add New Link"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (use #hashtags)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};