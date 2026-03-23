import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import { AddLinkModal } from "../AddLinkModal/AddLinkModal";
import type { LinkData } from "../AddLinkModal/AddLinkModal";
import { LinkCard } from "../LinkCard/LinkCard";
import { UsernameButton } from "../UsernameButton/UsernameButton";
import { ActionButton } from "../ActionButton/ActionButton";
import { Headingbar } from "../HeadingBar/Headingbar";
import { NavBar } from "../NavBar/NavBar";
import { Searchbar } from "../SearchBar/Searchbar";
import styles from "./LinkVault.module.css";

export const LinkVault = () => {
  const { user, logout } = useAuth();
  const [links, setLinks] = useState<LinkData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editLink, setEditLink] = useState<LinkData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = "http://localhost:5000/links";

  useEffect(() => {
    if (!user) return;

    const userLinksKey = `links_${user.id}`;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Server not available");
        return res.json();
      })
      .then((data) => {
        const linksArray = Array.isArray(data) ? data : (data.links || []);
        const userLinks = linksArray.filter((link: LinkData & { userId?: string }) => 
          !link.userId || link.userId === user.id
        );
        setLinks(userLinks);
        localStorage.setItem(userLinksKey, JSON.stringify(userLinks));
      })
      .catch(() => {
        const saved = localStorage.getItem(userLinksKey);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const linksArray = Array.isArray(parsed) ? parsed : (parsed.links || []);
            setLinks(linksArray);
          } catch {
            setLinks([]);
          }
        }
      });
  }, [user]);

  const handleSave = async (link: LinkData) => {
    if (!user) return;

    const userLinksKey = `links_${user.id}`;
    const linkWithUserId = { ...link, userId: user.id };

    if (editLink) {
      try {
        const res = await fetch(`${API_URL}/${editLink.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(linkWithUserId),
        });
        if (!res.ok) throw new Error("Server update failed");

        const updated = await res.json();
        const newLinks = links.map((l) =>
          l.id === editLink.id ? updated : l
        );
        setLinks(newLinks);
        localStorage.setItem(userLinksKey, JSON.stringify(newLinks));
      } catch {
        const updated = links.map((l) =>
          l.id === editLink.id ? { ...linkWithUserId, id: editLink.id } : l
        );
        setLinks(updated);
        localStorage.setItem(userLinksKey, JSON.stringify(updated));
      }
      setEditLink(null);
    } else {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(linkWithUserId),
        });
        if (!res.ok) throw new Error("Server save failed");

        const savedLink = await res.json();
        const updated = [...links, savedLink];
        setLinks(updated);
        localStorage.setItem(userLinksKey, JSON.stringify(updated));
      } catch {
        const newLink = { ...linkWithUserId, id: Date.now() };
        const updated = [...links, newLink];
        setLinks(updated);
        localStorage.setItem(userLinksKey, JSON.stringify(updated));
      }
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!user) return;

    const userLinksKey = `links_${user.id}`;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const updated = links.filter((link) => link.id !== id);
      setLinks(updated);
      localStorage.setItem(userLinksKey, JSON.stringify(updated));
    } catch {
      const updated = links.filter((link) => link.id !== id);
      setLinks(updated);
      localStorage.setItem(userLinksKey, JSON.stringify(updated));
    }
  };

  const handleEdit = (id: number | string) => {
    const link = links.find((l) => l.id === id);
    if (link) {
      setEditLink(link);
      setShowModal(true);
    }
  };

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.hashtags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  if (!user) return null;

  return (
    <>
      <NavBar
        child={
          <div className={styles.navActions}>
            <UsernameButton username={user.username} url="/icons/account-circle.png" />
            <ActionButton
              text="Logout"
              iconURL="/icons/cancel.png"
              onClick={logout}
            />
          </div>
        }
      />

      <Headingbar
        heading={"LIST"}
        child1={
          <ActionButton
            text="Add Link"
            iconURL="/icons/add-page.png"
            onClick={() => setShowModal(true)}
          />
        }
        child2={<Searchbar value={searchQuery} onChange={setSearchQuery} />}
      />

      <div className={styles.divider} />

      {filteredLinks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No links yet. Click "Add Link" to get started!</p>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {filteredLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              title={link.title}
              description={link.description}
              hashtags={link.hashtags}
              url={link.url}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddLinkModal
          onClose={() => {
            setShowModal(false);
            setEditLink(null);
          }}
          onSave={handleSave}
          initialData={editLink}
        />
      )}
    </>
  );
};


