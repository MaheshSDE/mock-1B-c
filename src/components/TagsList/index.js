import './index.css'

const TagsList = props => {
  const {tagsDetails, changeButton} = props
  const {optionId, displayText} = tagsDetails

  // const activeClassName = isActive ? 'active-class-name' : ''

  const updateButton = () => {
    changeButton(optionId)
  }

  return (
    <li className="tags-list-items">
      <button type="button" className="button-item" onClick={updateButton}>
        {displayText}
      </button>
    </li>
  )
}
export default TagsList
