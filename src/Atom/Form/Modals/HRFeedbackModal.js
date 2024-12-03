import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import dayjs from "dayjs";
import { HRFeedbackApi } from "../../../API/HRFeedbackApi";
import swal from "sweetalert";
import { mainModalContainer } from "../../../styles/ModalStyles";
import { useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
const HRFeedbackModal = ({
  modalShow,
  onHide,
  oldNotes,
  handleUpdateNotes,
  title,
  setModalShow,
  objectId,
  id,
  setRefreshPage,
  refreshPage,
  ...props
}) => {
  const [candidateFeedback, setCandidateFeedback] = useState({
    feedback: "",
    status: "",
    annualSalary: "",
    dateofJoining: "",
  });
  const [open, setOpen] = useState(false);
  const [openDateOfJoining, setDateofJoining] = useState(false);
  const [value, setValue] = React.useState(Date.now());
  const settingHRFeedback = (e) => {
    setCandidateFeedback({
      ...candidateFeedback,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const onSave = async () => {
    const { feedback } = candidateFeedback;
    console.log("feedback", feedback);
    if (feedback === "" || feedback === undefined) {
      swal("Please write feedback !", { icon: "error" });
    } else {
      const data = await HRFeedbackApi(candidateFeedback, objectId, value);
      setRefreshPage(!refreshPage);
      setModalShow(false);
      swal("Feedback Submitted Sucessfully !", { icon: "success" });
    }
  };
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={onHide}
        centered
        style={mainModalContainer}
        className="modal-main-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="btn-ui-site ddddd">
          <Form className="mt-3">
            <Form.Group
              className="mb-btmsp position-relative"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label className="flaot-labelbm">Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="feedback"
                id="feedback"
                value={candidateFeedback.feedback}
                onChange={(e) => settingHRFeedback(e)}
                maxLength="200"
                style={{ minHeight: "200px", maxHeight: "200px" }}
              />
            </Form.Group>
            <Form.Group className="mb-btmsp position-relative">
              <Form.Label className="flaot-labelbm">Status</Form.Label>
              <Form.Select
                name="status"
                id="status"
                value={candidateFeedback.status}
                onChange={(e) => settingHRFeedback(e)}
              >
                <option value="" disabled>
                  Choose Status
                </option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Hold">Hold</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  value={candidateFeedback.annualSalary}
                  onChange={(e) => {
                    setOpen(!open);
                    // settingHRFeedback(e);
                  }}
                />
                <label
                  class="form-check-label font-weight-medium"
                  for="flexCheckDefault"
                >
                  Annual Salary
                </label>
              </div>
              <Collapse in={open}>
                <div className="pt-2 pb-3">
                  <Form.Control
                    type="text"
                    name="annualSalary"
                    placeholder="Annual Salary"
                    value={candidateFeedback.annualSalary}
                    onChange={(e) => settingHRFeedback(e)}
                    maxLength="9"
                  />
                </div>
              </Collapse>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault-2"
                  value={candidateFeedback.dateofJoining}
                  onChange={(e) => {
                    setDateofJoining(!openDateOfJoining);
                    // settingHRFeedback(e);
                  }}
                />
                <label
                  class="form-check-label font-weight-medium"
                  for="flexCheckDefault-2"
                >
                  Date of Joining
                </label>
              </div>

              <Collapse in={openDateOfJoining}>
                <div className="pt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Collapse>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="btn-ui-site">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="success" onClick={() => onSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default HRFeedbackModal;
