import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalDelete } from "../../store/modalSlice";
import { setTodoID } from "../../store/todoSlice";
import ModalConfirmDelete from "../common/ModalConfirmDelete";
import styles from "./Footer.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { ITodo } from "../../types/interfaces";
import { EOption } from "../../types/constants";

const cx = classNames.bind(styles);

const Footer = () => {
  const { todos, selectedOption } = useSelector(
    (state: RootState) => state.todos
  );
  const { modalDeleteIsOpen } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");

  const handleShowModal = () => {
    dispatch(openModalDelete());
    dispatch(setTodoID(null));
  };

  const totalTaskCount: number = todos?.length;
  const activeTaskCount = todos?.filter(
    (todo: ITodo) => !todo.isCompleted
  ).length;
  const completedTaskCount = todos?.filter(
    (todo: ITodo) => todo.isCompleted
  ).length;

  useEffect(() => {
    setMessage(
      `You have ${
        selectedOption === EOption.Completed
          ? completedTaskCount
          : activeTaskCount
      } / ${totalTaskCount} tasks ${
        selectedOption === EOption.Completed ? "completed" : "pending left"
      }.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, activeTaskCount, completedTaskCount, totalTaskCount]);

  const footerClassName = cx("footer", {
    "footer--has-completed":
      completedTaskCount > 0 && selectedOption !== EOption.Completed,
  });

  return (
    <>
      <footer className={footerClassName}>
        <div className={cx("footer__text")}>{message}</div>

        <button
          className={cx("footer__btn")}
          onClick={handleShowModal}
          disabled={!todos.length}
        >
          Clear All
        </button>
      </footer>

      {modalDeleteIsOpen && <ModalConfirmDelete />}
    </>
  );
};

export default Footer;
