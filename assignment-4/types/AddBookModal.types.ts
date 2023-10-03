// import { BaseSyntheticEvent } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { AddBookInputs } from './app.types'

export interface AddBookModalProps {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  handleAddBook: () => void
  register: UseFormRegister<AddBookInputs>
}
