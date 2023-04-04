// TodoItem component

import {
  faClock,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import moment from "moment";
import { Fragment, memo, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalDelete, openModalEdit } from "../../store/modalSlice";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchTodos,
  setTodoID,
  toggleCompletedTodo,
} from "../../store/todoSlice";
import { ITodo } from "../../types/interfaces";
import ModalConfirmDelete from "../common/ModalConfirmDelete";
import ModalEdit from "../common/ModalEdit";
import styles from "./TodoItem.module.scss";

const cx = classNames.bind(styles);

interface TodoItemProps {
  todo: ITodo;
}

function TodoItem({ todo }: TodoItemProps) {
  const [showClock, setShowClock] = useState<boolean>(false);
  const [isOverdue, setIsOverdue] = useState<boolean>(false);
  const { modalEditIsOpen, modalDeleteIsOpen } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleShowModalEditItem = () => {
    dispatch(openModalEdit());
    dispatch(setTodoID(todo.id ?? null));
  };

  const handleShowModalDeleteItem = () => {
    dispatch(openModalDelete());
    dispatch(setTodoID(todo.id ?? null));
  };

  const handleToggleStatusTodo = () => {
    dispatch(
      toggleCompletedTodo({
        ...todo,
        isCompleted: !todo.isCompleted,
      })
    );
    dispatch(fetchTodos());
  };

  const handleFormatDate = (date: string) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  useEffect(() => {
    const remainingTime = moment(todo.deadlineDate).diff(moment());
    setShowClock(remainingTime > 0 && remainingTime <= 3600000);

    // Kiểm tra nếu deadline đã quá hạn
    setIsOverdue(remainingTime < 0 && !todo.isCompleted);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo.deadlineDate]);


  return (
    <Fragment>
      <div className={cx("todo-item")}>
        <div className={cx("todo-item__text-wrapper")}>
          <div
            className={cx("todo-item__text", {
              "todo-item__text--completed": todo.isCompleted,
            })}
          >
            {todo.text}

            <div className={cx("tooltip")}>{todo.text}</div>
          </div>
          <div className={cx("todo-item__deadline")}>
            {todo.deadlineDate && (
              <div
                className={cx("todo-item__deadline-date", {
                  overdue: isOverdue,
                })}
              >
                {handleFormatDate(todo.deadlineDate)}
                {isOverdue && (
                  <span className={cx("todo-item__overdue-text")}>
                    {" "}
                    - Overdue Time
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={cx("todo-item__btns")}>
          {!todo.isCompleted && showClock && (
            <div className={cx("todo-item__deadline-clock")}>
              <FontAwesomeIcon
                icon={faClock}
                className={cx("deadtime-clock-icon")}
              />
            </div>
          )}
          <div className={cx("btn__check")}>
            <input
              type='checkbox'
              checked={todo.isCompleted}
              onChange={handleToggleStatusTodo}
            />

            {/* <FontAwesomeIcon icon={faCheck} className={cx('btn__check-icon')} /> */}
          </div>

          <button className={cx("btn__edit")} onClick={handleShowModalEditItem}>
            <FontAwesomeIcon
              icon={faPenSquare}
              className={cx("btn__edit-icon")}
            />
          </button>
          <button
            className={cx("btn__delete")}
            onClick={handleShowModalDeleteItem}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className={cx("btn__delete-icon")}
            />
          </button>
        </div>
      </div>

      {modalEditIsOpen && <ModalEdit />}
      {modalDeleteIsOpen && <ModalConfirmDelete />}
    </Fragment>
  );
}

export default memo(TodoItem);
