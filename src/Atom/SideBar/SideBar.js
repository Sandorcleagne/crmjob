import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import icon from "../../Image/list.png";
import logo from "../../Image/snva-logoside-white.png";
import headmenu from "../../Image/headmenu.png";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../Redux/ActionTypes/ActionType";
import { EmpSidebarConfig, SidebarConfig } from "./SidebarConfig";
import { useCookies } from "react-cookie";
const SideBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [cookies, setCookie] = useCookies(["LOGIN"]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  function logout() {
    // dispatch({
    //   type: LOGOUT,
    //   payload: null,
    // });
    cookies.remove("login");
    // navigate("/");
  }
  const config = cookies.login.roleId === 1 ? SidebarConfig : EmpSidebarConfig;
  return (
    <div className="sidebar-lft">
      <div className="headmenu-box btn" onClick={handleShow}>
        <img src={headmenu} width="24"/>
      </div>

      <Offcanvas show={show} onHide={handleClose} scroll={true} className="offcanvas-site">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="px-2 py-2">
            {/* User is Only for Admin Roll - 1 & 2*/}

            {config.map((item, index) => {
              const { subheader, items, AccordianIcon } = item;
              return (
                <div className="offsetcanv-menu">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="dashboard-item">
                        <i className={`fa-solid menu-icon ${AccordianIcon}`}></i>{subheader}
                      </Accordion.Header>
                       <Accordion.Body>
                      {items && items.map((item, index) => ( 
                          <Link to={item.path} className="accordion-item-child w-100 d-block" onClick={handleClose}> 
                           <i className={`fa-solid menu-icon ${item.icons}`}></i>{item.title}
                          </Link>  
                      ))}
                         </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              );
            })}
            {/* <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="dashboard-item">
                  <div>
                    <i className="fa-solid menu-icon fa-users"></i>
                    &nbsp; Users
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Link to="/users" className="link">
                    {" "}
                    <div className="dashboard-item">
                      {" "}
                      <i className="fa-solid menu-icon fa-at"></i>&nbsp; Add Users
                    </div>
                  </Link>
                  <Link to="/viewUsers" className="link">
                    {" "}
                    <div className="dashboard-item">
                      {" "}
                      <i className="fa-solid menu-icon fa-eye"></i>
                      &nbsp; View Users
                    </div>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default SideBar;
