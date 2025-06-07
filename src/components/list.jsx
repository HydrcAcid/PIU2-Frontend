import React, {useState} from "react";
import Task from "./task";

const List = (props) => {
    const list = props.props;
    const [addprompt, setAddprompt] = useState(false);
    const translate = (data) => {
        const name = data.get('name');
        props.onAddTask(list.id, name);
    }

    return (
        <div className="kanban-list" key={list.id}>
            <div className='list-header'>
                <h3>{list.title}</h3>
                <a onClick={(e)=>{e.preventDefault(); props.onRemoveList(list.id)}}>X</a>
            </div>
            {list.tasks.map((task) => (
                <Task props={task} onUpdateTask={props.onUpdateTask} onRemoveTask={props.onRemoveTask} key={task.taskid}/>
            ))}
        <a className="add-task" onClick={(e)=>{e.preventDefault(); setAddprompt(!addprompt);}}>+ Add new task ...</a>
          { addprompt &&
            <form action={translate}>
              <input name='name' type='text'/>
            </form>
          }
    </div>
    )
}

export default List;