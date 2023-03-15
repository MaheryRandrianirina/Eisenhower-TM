function TasksCreation ({taskCreationCallback, tasksToAdd}){
    let tasks = ''
    if(tasksToAdd){
        tasks.concat(tasksToAdd)
    }

    return <div className="tasks_creation">
        <div className="container" style={{height: "120px"}}>
            <p className="text-muted p-2 m-2">Vous n'avez pas de taches. Veuillez en ajouter.</p>
            <button className="btn btn-success float-end" onClick={taskCreationCallback}>+</button>
            {tasks}
        </div>
    </div>
}

function TasksCreationSubmitButton({submitNewTasks, tasksImportance}) {
    let button
    let empty = true
    for(const index in tasksImportance){
        if(index === undefined){
            empty = true
        }else {
            empty = false
        }
    }
    if(empty){
        button = <button className='btn btn-success mt-5 w-100 custom_button'>Sauvegarder</button>
    }else {        
        button = <button onClick={submitNewTasks} className='btn btn-success mt-5 w-100 custom_button'>Sauvegarder</button>
    }
    return button
}

export { TasksCreation, TasksCreationSubmitButton }