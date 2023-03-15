import React, { Component } from "react";
import { removeElementFromDOM } from "../Tools/DOM";
import { ListNewTasksToAdd } from "./listNewTasksToAdd";
import { ListTasks } from "./ListTasks";
import { NewTask } from "./newtask";
import { NewTaskMenu } from "./newTaskMenu";
import { TasksCreation, TasksCreationSubmitButton } from "./tasksCreation";


class Tasks extends Component {
    constructor (props){
        super(props)
        this.state = {
            tasks: window.localStorage.getItem('tasks') ?? null,
            orderedTasks: window.localStorage.getItem('orderedTasks') ?? null,
            addingNewTask: false,
            currentClickedTask: null,
            tasksToAdd: [],
            newTask: null,
            newTaskValue: '',
            newTaskMenu: '',
            mouseOrigin: null,
            currentElementToMove: null,
            taskTransform: null
        }
        
        this.addNewTask = this.addNewTask.bind(this)
        this.handleNewTaskChange = this.handleNewTaskChange.bind(this)
        this.handleAddNewTask = this.handleAddNewTask.bind(this)
        this.handleNewTasksSubmit = this.handleNewTasksSubmit.bind(this)
        this.showNewTaskMenu = this.showNewTaskMenu.bind(this)
        this.handleAButtonClick = this.handleAButtonClick.bind(this)
        this.handleBButtonClick = this.handleBButtonClick.bind(this)
        this.handleCButtonClick = this.handleCButtonClick.bind(this)
        this.handleDButtonClick = this.handleDButtonClick.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleCheckButton = this.handleCheckButton.bind(this)
        this.handleSaveButton = this.handleSaveButton.bind(this)
        this.tasksImportance = {}
    }

    handleMouseDown = (e)=>{
        if(this.state.mouseOrigin === null) {
            this.setState({
                mouseOrigin: e.touches !== undefined ? e.touches[0] : e,
                currentElementToMove: e.currentTarget
            })
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    handleMouseMove = (e)=>{
        if(this.state.mouseOrigin !== null) {
            let position = e.touches !== undefined ? e.touches[0] : e
            this.setState({
                taskTransform: {
                    x: position.clientX - this.state.mouseOrigin.clientX,
                    y: position.clientY - this.state.mouseOrigin.clientY
                }
            }) 

            this.moveFollowingTransformValue()
        }
    }

    moveFollowingTransformValue()
    {
        if(this.state.taskTransform !== null) {
            let currentElementToMove = this.state.currentElementToMove
            currentElementToMove.style.transform = `translate3d(${this.state.taskTransform.x}px, ${this.state.taskTransform.y}px, 0)`
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    handleMouseUp = (e)=>{
        let currentElementToMove = this.state.currentElementToMove
        if(this.state.mouseOrigin !== null && currentElementToMove) {
            let rows = document.querySelectorAll('tbody tr')
            let rowAfter
            let rowBefore
            rows.forEach(row => {
                const elementToMoveY = currentElementToMove.getBoundingClientRect().y
                const rowY = row.getBoundingClientRect().y
                if(row !== currentElementToMove && this.state.taskTransform.y < 0) {
                    if(elementToMoveY - rowY <= 0 && rowAfter === undefined) {
                        rowAfter = row
                    }
                }else {
                    if(elementToMoveY - rowY > 0) {
                        rowBefore = row
                    }
                }
            })
            
            if(rowAfter !== undefined) {
                rowAfter.before(currentElementToMove)
                currentElementToMove.style.transform = 'translate3d(0,0,0)'
            }else if(rowBefore !== undefined) {
                rowBefore.after(currentElementToMove)
                currentElementToMove.style.transform = 'translate3d(0,0,0)'
            }

            this.setState({
                mouseOrigin: null
            })
        }
    }

    handleCheckButton = (e)=>{
        let clickedButton = e.currentTarget
        removeElementFromDOM(clickedButton.parentElement.parentElement)
        this.saveTasksOrder()
    }

    handleSaveButton = (e)=>{
        removeElementFromDOM(e.target)
        this.saveTasksOrder()
        document.location.reload()
    }

    saveTasksOrder = ()=>{
        let tbodyRows = Array.from(document.querySelectorAll('tbody tr'))
        if(tbodyRows.length > 0){
            let tasksOrder = {}
            tbodyRows.forEach(row => {
                let importance = row.querySelector('th')
                let task = row.querySelector('td')
                tasksOrder[task.innerText] = importance.innerText
            })
            localStorage.setItem('orderedTasks', JSON.stringify(tasksOrder))
        }else {
            localStorage.removeItem('tasks')
            localStorage.removeItem('orderedTasks')
            this.setState({
                tasks: window.localStorage.getItem('tasks') ?? null,
                orderedTasks: window.localStorage.getItem('orderedTasks') ?? null
            })
        }
        
    }

    addNewTask = (e) => {
        e.preventDefault()
        this.setState({
            newTask: <NewTask onNewTaskInputChange={this.handleNewTaskChange} addNewTaskButtonClick={this.handleAddNewTask}/>
        })
    }

    handleNewTaskChange = (e)=>{
        this.setState({newTaskValue: e.target.value})
    }

    handleAddNewTask = (e) => {
        const newTaskValue = this.state.newTaskValue
        if(newTaskValue !== ''){
            this.setState((state, props)=>{
                return {
                    addingNewTask: true,
                    newTask: null,
                    tasksToAdd: [...state.tasksToAdd, newTaskValue]
                }
            })
        }
        
    }

    showNewTaskMenu = (e)=>{
        this.setState((state, props)=>{
            return {
                currentClickedTask: e.target.parentElement.parentElement.firstElementChild.innerText,
                newTaskMenu: state.newTaskMenu === '' ? <NewTaskMenu onClickA={this.handleAButtonClick} onClickB={this.handleBButtonClick} onClickC={this.handleCButtonClick} onClickD={this.handleDButtonClick}/> : ''
            }
        })
    }

    handleAButtonClick = (e)=>{
        this.setTasksImportance(e)
        this.setState({
            newTaskMenu: ''
        })
    }

    handleBButtonClick = (e)=>{
        this.setTasksImportance(e)
        this.setState({
            newTaskMenu: ''
        })
    }

    handleCButtonClick = (e)=>{
        this.setTasksImportance(e)
        this.setState({
            newTaskMenu: ''
        })
    }

    handleDButtonClick = (e)=>{
        this.setTasksImportance(e)
        this.setState({
            newTaskMenu: ''
        })
    }

    setTasksImportance(e) {
        let button = e.target
        const importance = button.innerHTML
        const task = button.parentElement.parentElement.firstElementChild.innerText
        this.tasksImportance[task] = importance
    }

    handleNewTasksSubmit = ()=>{
        localStorage.setItem('tasks', JSON.stringify(this.tasksImportance))
        document.location.reload()
    }

    render ()
    {
        return <section id="tasks">
            <div className="container">
                { this.state.tasks !== null ? 
                    <ListTasks tasks={JSON.parse(this.state.tasks)} orderedTasks={JSON.parse(this.state.orderedTasks)} onMouseDown={this.handleMouseDown} 
                        onTouchStart={this.handleMouseDown} onMouseMove={this.handleMouseMove}
                        onTouchMove={this.handleMouseMove} onMouseUp={this.handleMouseUp} onToucEnd={this.handleMouseUp}
                        onClickSaveButton={this.handleSaveButton} onCheckButtonClick={this.handleCheckButton}
                    /> : 
                    <TasksCreation taskCreationCallback={this.addNewTask}/>
                }
                {this.state.tasksToAdd && <ListNewTasksToAdd currentClickedTask={this.state.currentClickedTask} newTaskMenu={this.state.newTaskMenu} newTasks={this.state.tasksToAdd} clickOnMenu={this.showNewTaskMenu}/>}
                
                {this.state.newTask ?? ''}
                {this.state.addingNewTask && <TasksCreationSubmitButton submitNewTasks={this.handleNewTasksSubmit} tasksImportance={this.tasksImportance}/>}
            </div>
            {this.state.tasksImportance}
        </section>
    }
}

export default Tasks