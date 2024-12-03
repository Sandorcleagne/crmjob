import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getLeadStatusHistory } from "../../../API/Lead_API";
import { apiurl, authCode } from "../../../Host";
import user from "../../../Image/user.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCookies } from "react-cookie";

const LeadsModal = ({
  modalShow,
  setModalShow,
  lead,
  onHide,
  statusHistory,
  contactinfo,
  ...props
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["LOGIN"]);
  console.log("cookies", cookies.login.userName);
  const userName = cookies.login.userName;
  return (
    <div>
      {" "}
      <Modal
        {...props}
        size="xl"
        centered
        className="candidate-infomd"
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
        onHide={onHide}
      >
        <Modal.Header className="align-items-start" closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> </Modal.Title>
        </Modal.Header>
        <Modal.Body className="btn-ui-site">
          <img src={user} className="user-candite-img" />

          <h3>{userName}</h3>

          <ul className="basicdt-list row align-items-start">
            <li className="d-flex align-items-center col-md-6 col-xl-4">
              <i class="fa-solid fa-envelope"></i>
              <div className="ps-3">
                <strong className="d-block">Mail</strong>{" "}
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </div>
            </li>
            <li className="d-flex align-items-center col-md-6 col-xl-4">
              <i class="fa-solid fa-phone"></i>
              <div className="ps-3">
                {" "}
                <strong className="d-block">Phone</strong>{" "}
                <a href={`tel:${lead.contact}`}>{lead.contact}</a>
              </div>
            </li>
            <li className="d-flex align-items-center col-md-6 col-xl-4">
              <i class="fa-solid fa-location-dot"></i>
              <div className="ps-3">
                <strong className="d-block">Location</strong> {lead.location}
              </div>
            </li>
          </ul>

          {statusHistory.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                    >
                      Disposition
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                    >
                      Comment
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(126 126 126 / 87%)", fontSize: "12px" }}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statusHistory.map((item) => (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{userName}</TableCell>
                      <TableCell>{item.disposition}</TableCell>
                      <TableCell>{item.comment}</TableCell>
                      <TableCell>{item.createDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p className="text-center mt-4 text-danger font-weight-semibold">
              No items found
            </p>
          )}
        </Modal.Body>
      </Modal>
      l
    </div>
  );
};

export default LeadsModal;
