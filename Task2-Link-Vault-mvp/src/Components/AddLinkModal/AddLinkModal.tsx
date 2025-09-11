import React, { useState } from "react";
import styles from "./AddLinkModal.module.css";

type Props = {
  onClose: () => void;
  onSave: (link: LinkData) => void;
};

export type LinkData = {
  id?: number;
  title: string;
  description: string;
  hashtags: string[];
  url: string;
};

export const AddLinkModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hashtags = description
      .split(/\s+/)
      .filter((word) => word.startsWith("#"))
      .map((tag) => tag.replace("#", ""));

    onSave({ title, description, hashtags, url });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add New Link</h2>
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
          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};