import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../../NotesList.module.css";
import { FaPlus } from "react-icons/fa";
import AppContext from "../../../../context/AppContext";

function CreateNote() {
  const { modal, toggleModal, setNoteHeadings, setCurrentGroup } = useContext(AppContext);

  function randomLetters(s) {
    if (!s) {
      return "NA";
    }

    const words = s.split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    } else {
      const firstIndex = Math.floor(Math.random() * words.length);
      const secondIndex =
        (firstIndex + 1 + Math.floor(Math.random() * (words.length - 1))) %
        words.length;

      const firstLetter = words[firstIndex][0] || "";
      const secondLetter = words[secondIndex][0] || "";

      return firstLetter.toUpperCase() + secondLetter.toUpperCase();
    }
  }

  const [grpName, setGrpName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(false);
  const tempColor = useRef();

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const addNote = () => {
    const letters = randomLetters(grpName);
    if (grpName && selectedColor) {
      const newGroup = {
        name: grpName,
        color: selectedColor,
        letters: letters,
        notes: [],
      };
      setNoteHeadings((prevNoteHeadings) => [...prevNoteHeadings, newGroup]);
      setCurrentGroup(newGroup);
      toggleModal();
      setGrpName("");
      setSelectedColor("");
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (modal) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setGrpName("");
          setSelectedColor("");
          setError(false);
          toggleModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modal, toggleModal]);

  useEffect(() => {
    if (modal) {
      setGrpName("");
      setSelectedColor("");
      setError(false);
    }
  }, [modal]);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      toggleModal();
      setGrpName("");
      setSelectedColor("");
      setError(false);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={toggleModal}>
        <FaPlus size="1em" />
        Create Notes group
      </button>
      {modal && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent}>
            <h3>Create New Notes</h3>
            <div>
              <label>Group Name</label>
              <input
                type="text"
                value={grpName}
                onChange={(e) => setGrpName(e.target.value)}
                placeholder="Enter your group name...."
              />
            </div>
            <div className={styles.colorComp}>
              <label>Choose color</label>
              <div>
                {colors.map((color) => {
                  const colorId = color.replace("#", "");
                  return (
                    <div
                      id={`${colorId}`}
                      key={colorId}
                      onClick={() => {
                        setSelectedColor(color);
                        tempColor.current = color;
                      }}
                      className={`${styles.color}  ${
                        selectedColor === color ? styles.selected : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <button onClick={addNote}>Create</button>
            {error && (
              <label
                id="error"
                className="hidden"
                style={{ marginTop: "-.5rem" }}
              >
                Yet to fill one or both fields
              </label>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNote;
