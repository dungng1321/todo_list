// modal confirm
import styles from "./ModalConfirmDelete.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  clearAllTodos,
  deleteTodo,
} from "../../../store/todoSlice";
import { closeModalDelete } from "../../../store/modalSlice";
import { AppDispatch, RootState } from "../../../store/store";

const cx = classNames.bind(styles);

function ModalConfirmDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { todoID } = useSelector(
    (state: RootState) => state.todos
  );
  const handleCloseModal = (): void => {
    dispatch(closeModalDelete());
  };

  const handleConfirm = async () => {
    if (todoID) {
      await dispatch(deleteTodo(todoID));
    } else {
      await dispatch(clearAllTodos());
    }
    await dispatch(fetchTodos());
    handleCloseModal();
  };

  const title = todoID
    ? "Are you sure you want to delete this item?"
    : "Are you sure you want to clear all items?";

  return (
    <div className={cx("modal-confirm-delete")}>
      <div className={cx("modal-confirm-delete__content")}>
        <div className={cx("modal-confirm-delete__title")}>
          <h3>{title}</h3>
        </div>
        <div className={cx("modal-confirm-delete__buttons")}>
          <button
            className={cx(
              "modal-confirm-delete__button",
              "modal-confirm-delete__button--cancel"
            )}
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className={cx(
              "modal-confirm-delete__button",
              "modal-confirm-delete__button--delete"
            )}
            onClick={handleConfirm}
          >
            {todoID ? "Delete" : "Clear all"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmDelete;
