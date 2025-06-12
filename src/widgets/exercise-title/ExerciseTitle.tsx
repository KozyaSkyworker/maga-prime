import { useState } from "react";

import { Input, Title, type TTitleVariant } from "../../shared/ui";

import styles from "./ExerciseTitle.module.css";

interface Props {
  name: string;
  className?: string;
  variant?: TTitleVariant;
}

export const ExerciseTitle = ({
  name,
  variant = "h1",
  className = "",
}: Props) => {
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
      className={styles.ExerciseTitle__input}
      onBlur={handleInputBlur}
      value={localName}
      onChange={(e) => setLocalName(e.target.value)}
      autoFocus
    />
  ) : (
    <Title
      variant={variant}
      className={className}
      onDoubleClick={handleDoubleClick}
    >
      {localName}
    </Title>
  );
};
