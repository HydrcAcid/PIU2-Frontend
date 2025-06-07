import React from "react";


const Task = (props) => {
    const task = props.props;
    
    const onTaskDoubleClick = (e) => {
        props.onRemoveTask(task.taskid)
    }
    return (
        <div className="task-card" key={task.taskid} onDoubleClick={onTaskDoubleClick}>
        <span className='task-title'>{task.title}</span>
        <div
        className={`status-dot`}
        style={{
        backgroundColor:
            task.status === 0
            ? 'red'
            : task.status === 1
            ? 'orange'
            : task.status === 2
            ? 'green'
            : 'gray'
            }}
        onClick={(e)=>{
            e.preventDefault(); 
            let state = task.status;
            state++;
            state = state > 2 ? 0 : state;
            props.onUpdateTask(task.taskid, task.title, state);
        }}
        ></div>
    </div>
    )
}

export default Task;