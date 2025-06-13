import { useState } from "react";

import { Input, Title, type TTitleVariant } from "../../shared/ui";
import { BASE_BACK_URL, useMutationRequest } from "../../shared/lib";
import { TExerciseDto } from "../../shared/types";

import styles from "./ExerciseTitle.module.css";

interface Props {
  name: string;
  exerciseId: number;
  className?: string;
  variant?: TTitleVariant;
}

export const ExerciseTitle = ({
  name,
  exerciseId,
  variant = "h1",
  className = "",
}: Props) => {
  const [isEditVisible, setIsSetEditVisible] = useState(false);
  const [localName, setLocalName] = useState(name);

  const { mutationRequest, isMutating } = useMutationRequest<
    Pick<TExerciseDto, "name">,
    TExerciseDto
  >({
    url: `${BASE_BACK_URL}/exercises/${exerciseId}`,
    method: "PATCH",
  });

  const handleDoubleClick = () => {
    setIsSetEditVisible(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      console.log("enter");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleInputBlur = () => {
    if (localName === "") {
      setLocalName(name);
    }

    if (localName !== name) {
      mutationRequest({ name: localName }).then((res) => {
        if (res?.status !== 200) {
          setLocalName(name);
        } else {
          setIsSetEditVisible(false);
        }
      });
    }

    setIsSetEditVisible(false);
  };

  return isEditVisible ? (
    <Input
      className={styles.ExerciseTitle__input}
      onBlur={handleInputBlur}
      value={localName}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      autoFocus
      disabled={isMutating}
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
