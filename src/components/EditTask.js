import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import Tippy from '@tippyjs/react';

const EditTask = ({ index, task, updateTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [updateTaskName, setUpdateTaskName] = useState("");

  return (
    <div>
      <Tippy content="Edit Task">
        <span
          className="cursor-pointer"
          style={{ marginRight: 10 }}
          onClick={() => setShowModal(true)}
        >
          <AiOutlineEdit size={20} color="#4C7CFF" />{" "}
        </span>
      </Tippy>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="task">Task Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Task name...."
            defaultValue={task && task.name}
            onChange={(e) => setUpdateTaskName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateTask(index, updateTaskName);
              setShowModal(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTask;
