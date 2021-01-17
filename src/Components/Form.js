import React from 'react'
import Input from './Input'

const Form = ({ handleNameChange, name, handleNumberChange, number, handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Input label="Name" value={name} onChange={handleNameChange} />
      <Input label="Number" value={number} onChange={handleNumberChange} />
      <button type="submit">Add</button>
    </form>
  </div>
)

export default Form