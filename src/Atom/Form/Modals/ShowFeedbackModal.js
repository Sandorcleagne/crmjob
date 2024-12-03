import React from "react";
import { Modal } from "react-bootstrap";
import { mainModalContainer } from "../../../styles/ModalStyles";
import Moment from "react-moment";

const ShowFeedbackModal = ({
  modalShow,
  onHide,
  title,
  candidateFeedbackInfo,
}) => {
  const {
    hrFeedback,
    status,
    interviewerName,
    dateOfJoining,
    dateOfSeduled,
    annualSalleryy,
  } = candidateFeedbackInfo;
  console.log("dateOfJoining", candidateFeedbackInfo);
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={onHide}
        size="md"
        centered
        style={mainModalContainer}
        className="modal-main-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="btn-ui-site">
          <ul className="basicdt-list fdb">
            <li className="d-flex">
              <i class="fa-solid fa-comment"></i>
              <div className="ps-3 pt-2">
                <strong className="d-block">FeedBack :</strong>
                {hrFeedback}
              </div>
            </li>

            <li className="d-flex align-items-center">
              <i class="fa-sharp fa-solid fa-clipboard-question"></i>
              <div className="ps-3">
                <strong className="d-block">Status : </strong>
                {status}
              </div>
            </li>

            <li className="d-flex align-items-center">
              <i class="fa-solid fa-user"></i>
              <div className="ps-3">
                <strong className="d-block">Interviewer Name : </strong>
                {interviewerName}
              </div>
            </li>
            <li className="d-flex align-items-center">
              <i class="fa-solid fa-sack-dollar"></i>
              <div className="ps-3">
                <strong className="d-block">Annual Salary : </strong>
                {annualSalleryy === null ? "Not Decided Yet" : annualSalleryy}
              </div>
            </li>

            <li className="d-flex">
              <i class="fa-solid fa-calendar-days"></i>
              <div className="ps-3 pt-2">
                <strong className="d-block mb-2">Date Of Interview : </strong>
                <Moment date={dateOfSeduled} format="Do MMM YYYY, h:mm a" />
              </div>
            </li>

            <li className="d-flex align-items-center">
              <i class="fa-solid fa-calendar-days"></i>
              <div className="ps-3">
                <strong className="d-block">Date Of Joining : </strong>
                {dateOfJoining === null ? (
                  ""
                ) : (
                  <Moment date={dateOfJoining} format="Do, MMM YYYY" />
                )}
              </div>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowFeedbackModal;
