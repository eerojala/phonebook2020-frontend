import React from 'react'
import Entry from './Entry'

const Phonebook = ({ entries, handleDelete }) => (
  <div>
    {entries.map((entry) => 
      <Entry key={entry.id} entry={entry} handleDelete={() => handleDelete(entry.id)} />
    )}
  </div>
)

export default Phonebook