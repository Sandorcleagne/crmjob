import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { host } from "../../Host";

const Userinfo = () => {


    // ---------------------------------Modal for ADD USER---------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ---------------------------------Modal for ADD USER END---------------------------------


    // ---------------------------------Modal2 for Modify User---------------------------------
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    // ---------------------------------Modal2 for Modify USER END---------------------------------




    // --------------------------------------SHOW ALL User--------------------------------------
    const [AllUser, setAllUser] = useState([])
    const [load, setLoad] = useState(false)
    function getUser() {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${host}/users`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllUser(result)
                setLoad(true)
            })
            .catch(error => console.log('error', error));
    }

    // --------------------------------------SHOW ALL User END--------------------------------------




    //--------------------------------------------- ADD USER INFO-------------------------------------------

    // USER INFO
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    function SaveUserInfo() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "phone": phone,
            "name": name,
            "email": email,
            "password": password,
            "roles": [
                {
                    "role": role
                }
            ],
            "deleted": false,
            "active": true
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${host}/createUser`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location.reload()
            })
            .catch(error => console.log('error', error));

        handleClose()
    }
    //--------------------------------------------- ADD USER INFO END ------------------------------------------




    // ----------------------------------MODIFICATION OF USER----------------------------------
    const [modify, setModify] = useState([])

    function modifyUser(e) {
        setModify(e)
        setModifyID(e._id)
        handleShow2()
    }

    const [Modifyrole, setModifyRole] = useState("")
    const [Modifyname, setModifyName] = useState("")
    const [Modifyemail, setModifyEmail] = useState("")
    const [Modifyphone, setModifyPhone] = useState("")
    const [Modifypassword, setModifyPassword] = useState("")
    const [ModifyID, setModifyID] = useState("")

    function modifyDone() {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "phone": Modifyphone,
            "name": Modifyname,
            "email": Modifyemail,
            "password": Modifypassword,
            "roles": [
                {
                    "role": Modifyrole
                }
            ],
            "deleted": false,
            "active": true,
            "_id": ModifyID
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${host}/updateUser`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("modify", result)
                window.location.reload()
            }
            )
            .catch(error => console.log('error', error));
    }
    // ----------------------------------MODIFICATION OF USER END----------------------------------



    //  ------------------------Delete User-------------------------
    function deleteUser(e) {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${host}/deleteUser?id=${e._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }
    //  ------------------------Delete User END-------------------------




    // ---------------------------use effect ---------------------------
    useEffect(() => {
        getUser()
    }, [])
    // ---------------------------use effect  END---------------------------


    return (
        <>
            <div>

                {/* Add User */}
                <div className="container-fluid AddUserContainer">
                    <div className="row">
                        <div className="col-12">
                            <button className="btn-add AddUser" onClick={handleShow}> <i className="fa-solid fa-plus icon-add"></i> Add User</button>

                        </div>
                    </div>
                </div>
                {/* Add User */}


                {/* UserList */}
                <div className="container-fluid">
                    <div className="row BookingLayout">
                        {load ? <div className="col-12 UserData">
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Created Date</th>
                                    <th>Modify</th>
                                    <th>Delete</th>
                                </tr>

                                {AllUser.map((items, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{items.name}</td>
                                        <td>{items.email}</td>
                                        <td>{items.phone}</td>
                                        <td>{items.roles[0].role}</td>
                                        <td>{items.creationDate.slice(0, 10)}</td>
                                        <td><button className="btn-modify" onClick={(e) => modifyUser(items)}> Modify</button></td>
                                        <td><button className="btn-delete" onClick={(e) => deleteUser(items)} >Delete</button></td>
                                    </tr>
                                ))}

                            </table>
                        </div>
                            : <div></div>}

                    </div>


                </div>
                {/* UserList */}


                {/* ADD USER */}
                <Modal className="ModalShow" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>  Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="btn-ui-site">
                        <div className="row">
                            <div className="col-12">
                                <select id="framework" className="addUserData" onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Ticketing">Ticketing</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder="Enter Email-ID" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                        </div>







                    </Modal.Body>
                    <Modal.Footer className="btn-ui-site">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-add" onClick={() => SaveUserInfo()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* ADD USER */}

                {/* MODIFY  USER */}
                <Modal className="ModalShow" show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>  Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="btn-ui-site">
                        <div className="row">
                            <div className="col-12">
                                <select id="framework" className="addUserData" onChange={(e) => setModifyRole(e.target.value)} >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Ticketing">Ticketing</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder={modify.name} onChange={(e) => setModifyName(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder={modify.email} onChange={(e) => setModifyEmail(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder={modify.phone} onChange={(e) => setModifyPhone(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-xxl-4">
                                <input type={`text`} className="addUserData" placeholder={modify.password} onChange={(e) => setModifyPassword(e.target.value)} />
                            </div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer className="btn-ui-site">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-add" onClick={() => modifyDone()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* MODIFY USER */}

            </div >
        </>
    )
}


export default Userinfo;