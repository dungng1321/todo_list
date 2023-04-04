import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/images';
import {  fetchTodos, setSelectedOption } from '../../store/todoSlice';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.scss';
import { AppDispatch, RootState } from '../../store/store';
import { ITodo } from '../../types/interfaces';
import { EOption } from '../../types/constants';

const cx = classNames.bind(styles);

function TodoList () {
  
 
  const dispatch = useDispatch<AppDispatch>();
  const {todos, selectedOption} = useSelector((state: RootState) => state.todos);



 const handleOptionClick = (option: string) => {
    dispatch(setSelectedOption(option));
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  // render by option

  const renderByOption = todos?.filter((todo: ITodo) =>
  selectedOption === EOption.Completed ? todo.isCompleted :
    selectedOption === EOption.Active ? !todo.isCompleted :
      true
);


  return (
    <div className={cx('todo-list')}>
      <div className={cx('todo-list__sort')}>
        
        <button
          className={cx('todo-list__sort-button', {
            'todo-list__sort-button--active': selectedOption === EOption.All,
          })}
          onClick={() => handleOptionClick(EOption.All)}
        >
          All
        </button>

        <button
          className={cx('todo-list__sort-button', {
            'todo-list__sort-button--active': selectedOption === EOption.Active,
          })}
          onClick={() => handleOptionClick(EOption.Active)}
        >
          Active
        </button>

        <button
          className={cx('todo-list__sort-button', {
            'todo-list__sort-button--active': selectedOption === EOption.Completed,
          })}
          onClick={() => handleOptionClick(EOption.Completed)}
        >
          Completed
        </button>
       
      </div>

      <h3 className={cx('todo-list__title')}>
        {renderByOption?.length === 0 ? '' : 'Your Tasks'}
      </h3>
      <div className={cx('todo-list__items')}>

        {renderByOption?.length === 0 ? (
          <div className={cx('todo-list__empty')}>
            <img src={images.emptyImage} alt="No tasks found" />
          </div>
        ) : (
          renderByOption?.map((item: ITodo) => (
            <TodoItem key={item.id} todo={item}  />
     
          ))
        )}
      </div>
    </div >
  );
}

export default TodoList;