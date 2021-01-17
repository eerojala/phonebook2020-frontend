import React from 'react'

const Entry = ({ entry, handleDelete }) => {
  return (
    <div>
      {entry.name} {entry.number}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Entry