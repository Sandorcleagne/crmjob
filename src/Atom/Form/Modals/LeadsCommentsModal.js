import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';


const LeadsCommentsModal = ({ modalShow, onHide, onSave, oldNotes, handleUpdateNotes, ...props }) => {
  return (
    <>
      <Modal show={modalShow} size="lg" onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="btn-ui-site">
          <Form className="mb-2 position-relative">
            <Form.Group
              className="mt-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="flaot-labelbm">Last edited by <b>{oldNotes.userName}</b> at <b>{oldNotes.modifyDate}</b></Form.Label>
              <Form.Control name="notes" as="textarea" rows={3} onChange={(e) => handleUpdateNotes(e, "notes")} value={oldNotes.notes == null ? "" : oldNotes.notes} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="btn-ui-site">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="success" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LeadsCommentsModal