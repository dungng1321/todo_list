// ModalEdit

import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./ModalEdit.module.scss";
import { addTodo, editTodo } from "../../../store/todoSlice";
import { closeModalEdit } from "../../../store/modalSlice";
import moment from "moment";
import { ITodo } from "../../../types/interfaces";
import { AppDispatch, RootState } from "../../../store/store";

const cx = classNames.bind(styles);

function ModalEdit() {
  const [text, setText] = useState<string>("");
  const [deadlineDate, setDeadlineDate] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const {todos} = useSelector((state: RootState) => state.todos)

  const dispatch = useDispatch<AppDispatch>();

  const { todoID } = useSelector(
    (state: RootState) => state.todos
  );

  const handleClose = ()=> {
    dispatch(closeModalEdit())
  }

  const handleSave = async () => {
    if (todoID) {
      const todoToUpdate: ITodo | undefined = todos.find(todo => todo.id === todoID);
      const todo: ITodo = {
        id: todoID,
        text: text.trim() || todoToUpdate?.text,
        deadlineDate,
        isCompleted: false,
      };
      await dispatch(editTodo(todo));
    } else {
      if (!text.trim()) {
        setIsInvalid(true);
        return;
      }
  
      const todo: ITodo = {
        text,
        deadlineDate,
        isCompleted: false,
      };
      await dispatch(addTodo(todo));
    }
    handleClose();
  };
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setIsInvalid(false);
  };

  return (
    <div className={cx("modal-edit")}>
      <div className={cx("modal-edit__wrapper")}>
        <h3 className={cx("modal-edit__title")}>
          {!todoID ? "Add Todo" : "Edit Todo"}
        </h3>
        <div className={cx("modal-edit__text")}>
          <label htmlFor='text-input' className={cx("modal-edit__label")}>
            Todo
          </label>
          <input
            id='text-input'
            type='text'
            className={cx("modal-edit__input", {
              "modal-edit__input--invalid": isInvalid,
            })}
            value={text}
            onChange={handleInputChange}
            placeholder={todoID ? "Edit new todo..." : "Add new todo..."}
          />

          {isInvalid && (
            <div className={cx("modal-edit__invalid-text")}>
              Please enter todo
            </div>
          )}
        </div>
        <div className={cx("modal-edit__deadline")}>
          <div className={cx("modal-edit__deadline__label-wrapper")}>
            <label
              htmlFor='deadline-date-input'
              className={cx("modal-edit__label")}
            >
              Deadline
            </label>
          </div>
          <div className={cx("modal-edit__deadline__input-wrapper")}>
            <input
              id='deadline-date-input'
              type='datetime-local'
              className={cx("modal-edit__deadline__input")}
              min={!todoID ? moment().format("YYYY-MM-DDTHH:mm") : ""}
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("modal-edit__btns")}>
          <button
            className={cx("modal-edit__btns__btn-cancel")}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className={cx("modal-edit__btns__btn-save")}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ModalEdit);
