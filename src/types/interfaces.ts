
//  todo

export interface ITodo {
    id?: number | null;
    text: string | undefined
    deadlineDate: string;
    isCompleted: boolean;
  }
  
  export interface ITodosState {
    todos: ITodo[];
    selectedOption: string;
    todoID: number | null;
  }
  

//  modal 

export interface IModalState {
  modalEditIsOpen: boolean;
  modalDeleteIsOpen: boolean;
}
