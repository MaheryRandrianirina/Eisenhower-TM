export function NewTask({onNewTaskInputChange, addNewTaskButtonClick}) {
    return <div className="mt-5 card">
        <div className="card-header bg-dark text-light">
            Nouvelle tâche
        </div>
        <div className="card-body">
        <input type="text" className="form-control float-start" name="new_task" onChange={onNewTaskInputChange} placeholder='ex : coder'/>
        <button className="btn btn-success mt-3 float-end" onClick={addNewTaskButtonClick}> Ajouter
            <svg className="ms-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </button>
        </div>
    </div>
}