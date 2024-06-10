import React, { useEffect, useState } from "react";
import NotesList from "./components/NotesList/NotesList";
import Notes from "./components/Notes/Notes";
import "./App.css";
import AppContext from "./context/AppContext";

function App() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);
  const [noteHeadings, setNoteHeadings] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : ""
  );
  const [hide, setHide] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setHide(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        modal,
        toggleModal,
        noteHeadings,
        setNoteHeadings,
        hide,
        setHide,
        isMobile,
        setIsMobile,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <div className="App">
        <NotesList />
        <Notes />
      </div>
    </AppContext.Provider>
  );
}

export default App;
