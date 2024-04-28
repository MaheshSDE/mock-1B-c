import './index.css'

const TasksList = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails

  return (
    <li className="task_item">
      <div className="task-item-container">
        <p className="task">{task}</p>
        <div className="tag-container">
          <p className="tag">{tag}</p>
        </div>
      </div>
    </li>
  )
}
export default TasksList
