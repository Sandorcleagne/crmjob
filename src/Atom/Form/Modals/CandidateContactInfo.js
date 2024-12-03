import React from "react";
import Modal from "react-bootstrap/Modal";
import user from "../../../../src/Image/user.png";

const CanidateContactInfo = ({
  modalShow,
  setModalShow,
  onHide,
  candidateContactInfo,
  ...props
}) => {
  const { name, email, location, contact, source } = candidateContactInfo;
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={onHide}
        centered
        size="md"
        className="candidate-infomd"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="align-items-start">
          <Modal.Title id="contained-modal-title-vcenter"> </Modal.Title>
        </Modal.Header>
        <Modal.Body className="btn-ui-site">
          <img src={user} className="user-candite-img" />

          <h3>{name}</h3>

          <ul className="basicdt-list">
            <li className="d-flex align-items-center">
              <i class="fa-solid fa-envelope"></i>
              <div className="ps-3">
                <strong className="d-block">Mail</strong>{" "}
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </li>
            <li className="d-flex align-items-center">
              <i class="fa-solid fa-phone"></i>
              <div className="ps-3">
                {" "}
                <strong className="d-block">Phone</strong>{" "}
                <a href={`tel:${contact}`}>{contact}</a>
              </div>
            </li>
            <li className="d-flex align-items-center">
              <i class="fa-solid fa-location-dot"></i>
              <div className="ps-3">
                <strong className="d-block">Location</strong> {location}
              </div>
            </li>
            <li className="d-flex align-items-center">
              <i class="fa-solid fa-people-group"></i>
              <div className="ps-3">
                <strong className="d-block">Source</strong> {source}
              </div>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CanidateContactInfo;
