import { CheckButton } from "./Interactions/checkButton"

export function ListTasks(props) {
    let taskRows = []
    let tasks 
    if(props.orderedTasks === null){
        tasks = props.tasks
        
    }else{
        tasks = props.orderedTasks
    }

    for(const task in tasks) {
        taskRows.push(
        <tr key={task} onMouseDown={props.onMouseDown} onTouchStart={props.onMouseDown}>
            <th scope="row" className="align-middle">{tasks[task]}</th>
            <td>{task}</td>
            { props.orderedTasks &&  <td><CheckButton onClick={props.onCheckButtonClick}/></td>}
        </tr>
        )
    }
    
    return <div className="container p-5 table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Importance/Urgence</th>
                    <th scope="col">Tâches</th>
                </tr>
            </thead>
            { props.orderedTasks === null ?
            <tbody onMouseMove={props.onMouseMove}
                onTouchMove={props.onMouseMove} onTouchEnd={props.onMouseUp} onMouseUp={props.onMouseUp} >
                {taskRows.map(row => {
                    return row
                })}
            </tbody> : <tbody>
                {taskRows.map(row => {
                    return row
                })}
            </tbody>}
        </table>
        { props.orderedTasks === null && <button className="btn btn-success mt-4 custom_button" style={{"width": "100%"}} onClick={props.onClickSaveButton}>Sauvegarder l'ordre des taches</button>}
    </div>
}