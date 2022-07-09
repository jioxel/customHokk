import { useReducer,useEffect } from "react";


export const useTodo = ( initialValue = []) => {
     const initialState=initialValue
     const init=()=>{
          return JSON.parse(localStorage.getItem('todos')) || [];
     }

     const [todos, dispatch] = useReducer(todoReducer,  initialState , init)

     useEffect(() => {
       
          localStorage.setItem('todos',JSON.stringify( todos ))
       
     }, [ todos ])

     const onNewTodo=( todo )=>{
          console.log("Entra")
          const action={
               type: '[Tarea] Agregar Tarea',
               payload: todo,
          }

          dispatch( action );

     }

     const onRemoveTodo=( id )=>{
          console.log(id)
          const action={
               type: '[Tarea] Eliminar Tarea',
               payload: id,
          }

          dispatch( action );
     }
     const onToggleTodo=( id )=>{
          console.log("Clic")
          const action={
               type: '[Tarea] Toggle Tarea',
               payload: id,
          }

          dispatch( action );

     }
     const todosCount = todos.length;

     const pendingTodosCount = todos.filter( todo => !todo.done).length 
  return {
     todos,
     todosCount,
     pendingTodosCount,
     onNewTodo,
     onToggleTodo,
     onRemoveTodo,
  }
}

const todoReducer=(initialState,action)=>{

     switch (action.type){
          case '[Tarea] Agregar Tarea':
               return [...initialState, action.payload]
          case '[Tarea] Eliminar Tarea':
               console.log(initialState.filter( todo => todo.id !== action.payload))
               return initialState.filter( todo => todo.id !== action.payload);
          case '[Tarea] Toggle Tarea':
               return initialState.map(todo =>{
                    if ( todo.id == action.payload ){
                         return{
                              ...todo,
                              done: !todo.done
                         }
                    }
                    return todo
               })
          default:
               return initialState;
     }


}
