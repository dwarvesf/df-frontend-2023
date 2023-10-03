import { SuccesMessageProps } from '../types/SuccessMessage.types'

const SuccessMessage = ({ displayMessage }: SuccesMessageProps) => {
  return (
    <div
      className={`${
        displayMessage ? 'flex' : 'hidden'
      } absolute top-3 left-[48%] p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400`}
      role="alert"
    >
      <i className="fa-solid fa-circle-check mr-3" />
      <div>
        <span className="font-medium">Success!</span>
      </div>
    </div>
  )
}

export default SuccessMessage
