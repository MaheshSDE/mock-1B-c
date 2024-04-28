import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagsList from './components/TagsList'

import TasksList from './components/TasksList'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskList: [],
    activeId: tagsList[0].optionId,
    userInput: '',
  }

  onChangeSelectInput = event => {
    this.setState({activeId: event.target.value})
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  changeButton = optionId => {
    const {taskList} = this.state
    const filteredList = taskList.filter(eachItem => {
      if (eachItem.optionId === optionId) {
        return {...eachItem, isActiveButton: !eachItem.isActiveButton}
      }
      return eachItem
    })
    this.setState({taskList: filteredList})
  }

  /* changeButton = optionId => {
    const {taskList} = this.state
    const filteredList = taskList.filter(eachItem => eachItem.tag === optionId)
    this.setState({taskList: filteredList})
  } */

  onAddTask = event => {
    event.preventDefault()

    const {activeId, userInput} = this.state

    const newTask = {
      id: uuidv4(),
      task: userInput,
      tag: activeId,
      isActiveButton: true,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      userInput: '',
      activeId: tagsList[0].optionId,
    }))
  }

  render() {
    const {taskList, activeId, userInput} = this.state
    const updatedList = taskList.filter(eachItem => eachItem.tag === activeId)

    return (
      <div className="app-container">
        <div className="left-section-container">
          <h1 className="heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onAddTask}>
            <label htmlFor="textInput" className="label">
              Task
            </label>
            <input
              type="text"
              className="inputElement"
              id="textInput"
              placeholder="Enter the task here"
              value={userInput}
              onChange={this.onChangeInput}
            />
            <label htmlFor="selectInput" className="label">
              Tags
            </label>
            <select
              value={activeId}
              onChange={this.onChangeSelectInput}
              id="selectInput"
              className="selectElement"
            >
              {tagsList.map(eachItem => (
                <option
                  key={eachItem.optionId}
                  value={eachItem.optionId}
                  className="selectElement"
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <div className="button-container">
              <button type="submit" className="add-task-button">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="right-section-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-un-order-list">
            {tagsList.map(eachItem => (
              <TagsList
                tagsDetails={eachItem}
                key={eachItem.optionId}
                isActive={eachItem.optionId === activeId}
                changeButton={this.changeButton}
              />
            ))}
          </ul>
          <div className="tasks-container">
            <h1 className="task-heading">Tasks</h1>
            <ul className="tasks-un-order-list">
              {taskList.length > 0 ? (
                <ul className="tasks-un-order-list">
                  {updatedList.map(eachItem => (
                    <TasksList taskDetails={eachItem} key={eachItem.id} />
                  ))}
                </ul>
              ) : (
                <div className="not-found-tasks">
                  <p className="no-found">No Tasks Added Yet</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default App
