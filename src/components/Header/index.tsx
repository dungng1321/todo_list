import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames/bind";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalEdit } from "../../store/modalSlice";
import { setTodoID } from "../../store/todoSlice";
import ModalEdit from "../common/ModalEdit";
import styles from "./Header.module.scss";
import { AppDispatch, RootState } from "../../store/store";

const cx = className.bind(styles);

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { modalEditIsOpen } = useSelector(
    (state: RootState) => state.modal
  );

  const handleShowModal = () => {
    dispatch(openModalEdit());
    dispatch(setTodoID(null));
  };

  return (
    <Fragment>
      <div className={cx("wrapper")}>
        <div className={cx("header__title")}>Todo App</div>

        <div className={cx("header__button")} onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className={cx("header__icon")} />
        </div>
      </div>

      {modalEditIsOpen && <ModalEdit />}
    </Fragment>
  );
}

export default Header;
