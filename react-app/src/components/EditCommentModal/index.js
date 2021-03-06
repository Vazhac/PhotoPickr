
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-comment-button" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
