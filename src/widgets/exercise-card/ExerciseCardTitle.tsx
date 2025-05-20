import { useState } from "react";

import { Input } from "../../shared/ui";

import styles from "./ExerciseCard.module.css";

export const ExerciseCardTitle = ({ name }: { name: string }) => {
  const [isEditVisible, setIsSetEditVisible] = useState(false);
  const [localName, setLocalName] = useState(name);

  const handleDoubleClick = () => {
    setIsSetEditVisible(true);
  };

  const handleInputBlur = () => {
    if (localName === "") {
      setLocalName(name);
    }

    if (localName !== name) {
      // TODO: Fetch edit title
    }

    setIsSetEditVisible(false);
    // TODO: blur on Enter
  };

  return isEditVisible ? (
    <Input
      className={styles.ExerciseCardTitle__input}
      onBlur={handleInputBlur}
      value={localName}
      onChange={(e) => setLocalName(e.target.value)}
      autoFocus
    />
  ) : (
    <h2
      className={styles.ExerciseCard__title}
      onDoubleClick={handleDoubleClick}
    >
      {localName}
    </h2>
  );
};
