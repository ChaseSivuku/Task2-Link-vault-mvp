import React, { useState, useEffect } from "react";
import { AddLinkModal } from "./Components/AddLinkModal/AddLinkModal";
import type { LinkData } from "./Components/AddLinkModal/AddLinkModal";
import { LinkCard } from "./Components/LinkCard/LinkCard";
import { UsernameButton } from "./Components/UsernameButton/UsernameButton";
import { ActionButton } from "./Components/ActionButton/ActionButton";
import { Headingbar } from "./Components/HeadingBar/Headingbar";
import { NavBar } from "./Components/NavBar/NavBar";
import { Searchbar } from "./Components/SearchBar/Searchbar";
import "./App.css";

function App() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editLink, setEditLink] = useState<LinkData | null>(null);

  const API_URL = "http://localhost:5000/links";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Server not available");
        return res.json();
      })
      .then((data) => setLinks(data))
      .catch(() => {
        const saved = localStorage.getItem("links");
        if (saved) setLinks(JSON.parse(saved));
      });
  }, []);

  const handleSave = async (link: LinkData) => {
    if (editLink) {
  
      try {
        const res = await fetch(`${API_URL}/${editLink.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(link),
        });
        if (!res.ok) throw new Error("Server update failed");

        const updated = await res.json();
        setLinks((prev) =>
          prev.map((l) => (l.id === editLink.id ? updated : l))
        );
      } catch {

        const updated = links.map((l) =>
          l.id === editLink.id ? { ...link, id: editLink.id } : l
        );
        setLinks(updated);
        localStorage.setItem("links", JSON.stringify(updated));
      }
      setEditLink(null);
    } else {
      // Adding new link
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(link),
        });
        if (!res.ok) throw new Error("Server save failed");

        const savedLink = await res.json();
        setLinks((prev) => [...prev, savedLink]);
      } catch {
        const newLink = { ...link, id: Date.now() };
        const updated = [...links, newLink];
        setLinks(updated);
        localStorage.setItem("links", JSON.stringify(updated));
      }
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch {
      const updated = links.filter((link) => link.id !== id);
      setLinks(updated);
      localStorage.setItem("links", JSON.stringify(updated));
    }
  };

  // ✅ Edit link
  const handleEdit = (id: number) => {
    const link = links.find((l) => l.id === id);
    if (link) {
      setEditLink(link);
      setShowModal(true);
    }
  };

  return (
    <>
      <NavBar
        child={
          <UsernameButton username="Username" url="/icons/account-circle.png" />
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
        child2={<Searchbar />}
      />

      <hr />

      {links.map((link) => (
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

      {showModal && (
        <AddLinkModal
          onClose={() => {
            setShowModal(false);
            setEditLink(null);
          }}
          onSave={handleSave}
          {...(editLink ? { initialData: editLink } : {})} // pass initial data if editing
        />
      )}
    </>
  );
}

export default App;