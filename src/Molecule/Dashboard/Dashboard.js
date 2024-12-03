import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import {
  activateCandidate,
  deactivateCandidate,
} from "../../API/DeactivateCandidate";
import { getAllLeadsByUserId } from "../../API/getAllLeadsData";
import FindCandidatesForm from "../../Atom/Form/FindCandidatesForm";
import CanidateContactInfo from "../../Atom/Form/Modals/CandidateContactInfo";
import Data_Table from "../../Custom-Components/Data_Table";
import useGetLead from "../../Hooks/useGetLead";
const DashboardData = () => {
  // Hooks
  const [candidateContactInfo, setCandidateContactInfo] = useState({});
  const [lead, setLead] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const userId = cookies.login.userId;
  const roleId = cookies.login.roleId;
  var leads = useGetLead(pageRefresh, setLead);
  console.log("leads", leads);
  // Custom state
  const [check, setCheck] = useState([]);

  // Functions
  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };
  const SelectItem = (e) => {
    if (e) {
      setCheck(e.selectedRows);
      // check.push(item);
    } else {
      // check.pop(item);
    }
  };
  const dangerStyle = {
    backgroundColor: "#FFF5F8",
    padding: "10px !important",
    color: "#F1416C",
    fontSize: "12px",
  };
  const sucessStyle = {
    backgroundColor: "#E8FFF3",
    padding: "10px !important",
    color: "#50CD89",
    fontSize: "12px",
  };
  const warning = {
    backgroundColor: "#FFFBEB",
    padding: "10px !important",
    color: "#E4B200",
    fontSize: "12px",
  };
  const blueStyle = {
    backgroundColor: "#EEF6FF",
    padding: "10px !important",
    color: "#3E97FF",
    fontSize: "12px",
  };
  const handelCloseModal = () => {
    setModalShow(false);
  };
  const openModal = (row) => {
    setModalShow(true);
    setCandidateContactInfo(row);
  };
  const deactivateCandidateAPi = async (row) => {
    const data = await deactivateCandidate(row.id);
    const { id } = data.data;
    if (id != null) {
      swal("Good job!", "Just Deactivated " + row.name, "success");
      setPageRefresh(!pageRefresh);
    } else {
      swal("Alert!", "Something Went Erong", "error");
    }
  };
  const activateCandidateApi = async (row) => {
    const data = await activateCandidate(row.id);
    const { id } = data.data;
    if (id != null) {
      swal("Good job!", "Just Activated " + row.name, "success");
      setPageRefresh(!pageRefresh);
    } else {
      swal("Alert!", "Something Went Erong", "error");
    }
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <span className="lead-email">
          <b>{row.name}</b>
        </span>
      ),
    },
    {
      name: "Phone",
      selector: "contact",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => (
        <a className="lead-email" onClick={() => openModal(row)}>
          {row.email}
        </a>
      ),
    },
    {
      name: "Date",
      selector: "createDate",
      sortable: true,
      cell: (row) => <a>{formatDate(row.createDate)}</a>,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) =>
        row.dispositionId === 1 ? (
          <span className="badge" style={sucessStyle}>
            Call Back
          </span>
        ) : row.dispositionId === 2 ? (
          <span className="badge" style={dangerStyle}>
            Not Interested
          </span>
        ) : row.dispositionId === 3 ? (
          <span className="badge" style={dangerStyle}>
            Not Answer
          </span>
        ) : row.dispositionId === 4 ? (
          <span className="badge" style={dangerStyle}>
            Irrelevant
          </span>
        ) : row.dispositionId === 5 ? (
          <span className="badge" style={sucessStyle}>
            Relevant
          </span>
        ) : row.dispositionId === 6 ? (
          <span className="badge" style={dangerStyle}>
            Number not valid
          </span>
        ) : row.dispositionId === 7 ? (
          <span className="badge" style={warning}>
            Already Contacted
          </span>
        ) : row.dispositionId === 8 ? (
          <span className="badge" style={blueStyle}>
            Follow Up
          </span>
        ) : row.dispositionId === 9 ? (
          <span className="badge" style={dangerStyle}>
            Already Selected
          </span>
        ) : row.dispositionId === 10 ? (
          <span className="badge" style={dangerStyle}>
            Back Out
          </span>
        ) : row.dispositionId === 11 ? (
          <span className="badge" style={dangerStyle}>
            Not Looking For Job Change
          </span>
        ) : row.dispositionId === 12 ? (
          <span className="badge" style={dangerStyle}>
            Expensive as per slab
          </span>
        ) : (
          ""
        ),
    },
    {
      name: "Manager",
      selector: "managerName",
      sortable: true,
      style: {
        color: "green",
        "font-weight": "bold",
      },
    },
    {
      name: "Hr-Executive",
      selector: "agentName",
      sortable: true,
      style: {
        color: "red",
        "font-weight": "bold",
      },
    },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div
          className="btn-group-s d-flex"
          role="group"
          aria-label="Basic mixed styles example"
        >
          {/* <button
            type="button"
            className="btn btn-success"
            // onClick={(e) => updateLeadDisposition(row)}
          >
            <i className="fa-solid fa-check"></i>
          </button> */}
          <button
            type="button"
            class="btn btn-warning mw-auto mx-1"
            disabled={row.inActive === "2" ? true : false}
            onClick={() =>
              navigate(`/dashboard/profile-user/View/leadId-${row.id}` + "", {
                state: { row },
              })
            }
          >
            <i className="fa-solid fa-circle-info"></i>
          </button>
        </div>
      ),
    },
    {
      name: "Delete",
      sortable: true,
      cell: (row) =>
        row.inActive == "1" ? (
          <button
            className="btn btn-success"
            onClick={() => deactivateCandidateAPi(row)}
          >
            Active
          </button>
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => activateCandidateApi(row)}
          >
            Deactive
          </button>
        ),
    },
  ];

  useEffect(() => {
    getAllLeadsByUserId(userId, roleId);
  }, [pageRefresh]);
  return (
    <>
      <>
        <FindCandidatesForm setLead={setLead} />
        <Data_Table columns={columns} SelectItem={SelectItem} data={leads} />
        <CanidateContactInfo
          modalShow={modalShow}
          onHide={handelCloseModal}
          candidateContactInfo={candidateContactInfo}
        />
      </>
    </>
  );
};

export default DashboardData;
