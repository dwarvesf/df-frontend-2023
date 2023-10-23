import React, { useEffect, useState } from "react";
//! imp Components
import DeleteIcon from "../../components/Icons/DeleteIcon";
import { ConfirmationModal, InputAddTopicModal } from "../../components/Modal";
import Table from "../../components/Table";
import { useStore } from "../../store";

function Topic() {
  const [selectedId, setSelectedId] = React.useState(null);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [showModalInputAddTopic, setShowModalInputAddTopic] = useState(false);

  const [modalConfirmation, setModalConfirmation] = React.useState({
    content: "",
  });

  const { state, contextActions } = useStore();
  const { topic } = contextActions;

  const TopicCountRef = React.useRef(0);
  console.log(
    "%c__Debugger__Topic::re-render",
    "color: yellow;",
    (TopicCountRef.current += 1)
  );
  const [values, setValues] = useState({
    search: "",
  });

  console.log("state: ", state);

  //! fetch data once
  useEffect(() => {
    topic.fetchAll();
  }, []);

  const handleChange = (e) => {
    topic.fetchTopicsByFilter({ search: e.target.value });

    //! debound
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  function handleClickAdd(e) {
    e.preventDefault();
    setShowModalInputAddTopic(true);
  }

  function handleClickConfirmDelete(e, topic) {
    e.stopPropagation();
    setModalConfirmation({
      content: `Do you want to delete ${topic.name} topic.`,
    });
    setShowModalConfirmation(true);
    setSelectedId(topic.id);
  }

  function handleDeleteTopicSubmit() {
    topic.findIdAndDelete(selectedId);

    // const data = models.topic.fetchtopics();

    // settopicDatas(data);
    setShowModalConfirmation(false);
  }

  function handleAddTopicSubmit(e, data) {
    topic.create(data);
  }

  function handleClickCancel(e) {
    e.preventDefault();
    setShowModalConfirmation(false);
    setShowModalInputAddTopic(false);
    setSelectedId(null);
  }

  const tableHeaders = ["", "Name", "Action"];
  const tableDetails = state?.topics?.map((topic, index) => {
    return {
      idx: index + 1,
      name: topic.name,
      action: (
        <button
          className="btn btn-delete"
          onClick={(e) => handleClickConfirmDelete(e, topic)}
        >
          <DeleteIcon color="#000000" />
        </button>
      ),
    };
  });

  return (
    <div className="">
      <form>
        <div className="container__row inspiration-form-control-group">
          <div className="container__col-12 container__col-sm-9 inspiration-form-control form-control-search">
            <input
              type="text"
              id="ipt-search"
              name="search"
              aria-labelledby="search"
              value={values.search}
              onChange={handleChange}
            />
            <label className="label" htmlFor="ipt-search" id="label-search">
              <div className="text">Search</div>
            </label>
          </div>
          <button
            className="container__col-sm-offset-1 container__col-sm-2 btn btn-add"
            type="submit"
            onClick={handleClickAdd}
          >
            Add
          </button>
        </div>
      </form>
      <Table tableHeaders={tableHeaders} tableDetails={tableDetails} />
      <ConfirmationModal
        submitLabelContent="Delete"
        isOpen={showModalConfirmation}
        handleSubmit={handleDeleteTopicSubmit}
        handleClose={handleClickCancel}
      >
        {modalConfirmation.content}
      </ConfirmationModal>
      <InputAddTopicModal
        submitLabelContent="Add"
        isOpen={showModalInputAddTopic}
        handleAddTopicSubmit={handleAddTopicSubmit}
        handleClose={handleClickCancel}
      />
    </div>
  );
}

export default Topic;
