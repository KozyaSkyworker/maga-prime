import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

import { BASE_BACK_URL, useMutationRequest } from "../../shared/lib";
import { Button } from "../../shared/ui";

import styles from "./DeleteExercise.module.css";

export const DeleteExercise = ({
  id,
  redirectTo,
}: {
  id: number;
  redirectTo?: string;
}) => {
  const navigate = useNavigate();

  const { mutationRequest, isMutating } = useMutationRequest<void, string>({
    url: `${BASE_BACK_URL}/exercises/${id}`,
    method: "DELETE",
  });

  const handleClickDelete = async () => {
    // TODO: show popup confirm + response обработать
    await mutationRequest();

    if (redirectTo) {
      navigate(redirectTo);
    } else {
      window.location.reload();
    }
  };

  return (
    <Button
      variant="error"
      onClick={handleClickDelete}
      className={styles.DeleteExercise__btn}
      disabled={isMutating}
    >
      <DeleteIcon />
    </Button>
  );
};
