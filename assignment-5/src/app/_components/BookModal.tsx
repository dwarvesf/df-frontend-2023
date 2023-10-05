import { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { topics } from '../_utils/constants'
import { BookModalProps } from '../_types/BookModal.types'

const BookModal = ({
  openModal,
  defaultValues,
  handleOK,
  handleCloseModal,
}: BookModalProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(defaultValues)
  }, [form, defaultValues])

  const initialValues =
    defaultValues.id !== -1 ? defaultValues : { topic: 'Programming' }

  const okText = defaultValues.id === -1 ? 'Create' : 'Edit'

  return (
    <Modal
      title={`${okText} book`}
      open={openModal}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            const id =
              okText === 'Create' && defaultValues.id === -1
                ? Date.now()
                : defaultValues.id
            handleOK({ ...values, id })
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
      onCancel={handleCloseModal}
    >
      <Form
        key={defaultValues.id}
        form={form}
        layout="vertical"
        name="book-form"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please fill the book name!' },
            {
              min: 5,
              message: 'Book name should contain at least 5 characters',
            },
          ]}
        >
          <Input placeholder="Book name" />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            { required: true, message: 'Please input the author of book!' },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: 'Author name should only contain letters and spaces',
            },
          ]}
        >
          <Input placeholder="Book author" />
        </Form.Item>
        <Form.Item name="topic" label="Topic">
          <Select
            options={topics.map((topic) => {
              return { value: topic, label: topic }
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BookModal
