import React, { useContext, useState, useEffect } from "react";
import styles from "../NotesList/NotesList.module.css";
import CreateNote from "./subcomponents/CreateNote/CreateNote";
import NoteHeading from "./subcomponents/NoteHeading/NoteHeading";
import AppContext from "../../context/AppContext";

function NotesList() {
  const { modal, toggleModal, noteHeadings, hide, currentGroup, setCurrentGroup } = useContext(AppContext);
  const [selectedHeading, setSelectedHeading] = useState(currentGroup?.name);

  useEffect(() => {
    if (currentGroup) {
      setSelectedHeading(currentGroup.name);
    }
  }, [currentGroup]);

  const handleHeadingClick = (noteHeading) => {
    setSelectedHeading(noteHeading.name);
    setCurrentGroup(noteHeading);
  };

  return (
    <div className={`${styles.container} ${hide && styles.hidden} `}>
      <h2>Pocket Notes</h2>
      <CreateNote modal={modal} toggleModal={toggleModal} />
      {noteHeadings.length > 0 && (
        <>
          {noteHeadings.map((noteHeading) => (
            <div
              key={noteHeading.name}
              onClick={() => handleHeadingClick(noteHeading)}
              className={
                selectedHeading === noteHeading.name ? styles.selectedHeading : ""
              }
            >
              <NoteHeading noteHeading={noteHeading} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default NotesList;
