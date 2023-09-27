import { Modal, Form, Input, Select } from "antd";

const AddBookModal = ({
  form,
  openModal,
  handleAddBook,
  handleCloseModal,
  topics,
}) => {
  return (
    <Modal
      title='Add book'
      open={openModal}
      okText='Create'
      cancelText='Cancel'
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleAddBook({ ...values, id: Date.now() });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={handleCloseModal}
    >
      <Form
        form={form}
        layout='vertical'
        name='add-book-form'
        initialValues={{ topic: "Programming" }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[
            { required: true, message: "Please input the name of book!" },
          ]}
        >
          <Input placeholder='Book name' />
        </Form.Item>
        <Form.Item
          name='author'
          label='Author'
          rules={[
            { required: true, message: "Please input the author of book!" },
          ]}
        >
          <Input placeholder='Book author' />
        </Form.Item>
        <Form.Item name='topic' label='Topic'>
          <Select
            options={topics.map((topic) => {
              return { value: topic, label: topic };
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
