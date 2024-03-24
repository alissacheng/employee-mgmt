const DeleteModal = ({ name, cancel, submitDelete }) => {
  return(
    <div className={`modal modal-fade d-block ${name ? 'show' : ''}`} tabIndex="-1" id="deleteModal">
      <div className="modal-dialog mt-5 mx-sm-auto mx-3">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure you want to delete?</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="deleteModal" 
              aria-label="Close"
              onClick={cancel}
            >
            </button>
          </div>
          <div className="modal-body">
            <p>This will delete <strong>{name}</strong> permanently. You cannot undo this action.</p>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="deleteModal"
              onClick={cancel}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={submitDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;