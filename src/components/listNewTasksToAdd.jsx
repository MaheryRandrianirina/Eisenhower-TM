export function ListNewTasksToAdd(props) {
    return <ul className="list-group mt-2">{props.newTasks.map(task =>{
        return <li className="list-group-item position-relative" key={props.newTasks.indexOf(task)}>
                <small>{task}</small>
                <div onClick={props.clickOnMenu} className="position-absolute end-0 top-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="position-absolute top-0 end-0 text-success">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
                {props.currentClickedTask === task && props.newTaskMenu}
            </li>
    }) }</ul>
}