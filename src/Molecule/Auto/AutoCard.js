import React, { useState } from "react";
import { Loader, Sidebar } from "semantic-ui-react";
import SideBar from "../../Atom/SideBar/SideBar";
import tick from "../../Image/tick.gif"
import Modal from 'react-bootstrap/Modal'
import { host } from "../../Host";
import loadergif from "../../Image/plane.gif"


const AutoCard = () => {
    const [user, setUser] = useState([])
    const [code, setCode] = useState("")
    const [load, setLoad] = useState(false)
    const [pnr, setpnr] = useState([])
    const [show, setShow] = useState(false);
    const [loader, setloader] = useState(false);
    const handleClose = () => setShow(false);



    console.log("code", code)
    async function autoUserFilter(e) {
        setCode(e.target.value)

    }


    async function GetUser() {
        setloader(true)
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${host}/checkAndBook?bookingId=` + code, requestOptions)
            .then(response => response.text())
            .then(result => {
                let response = JSON.parse(result)
                setUser(response)
                setLoad(true)
                setloader(false)
            })
            .catch(error => console.log('error', error));
    }


    function BookNow(items) {
        console.log("check", items)
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(items);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${host}/reviewAndBook`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let response = JSON.parse(result)
                setpnr(response)
                setShow(true)

            })
            .catch(error => console.log('error', error));
    }

    console.log('pnr', pnr)

    return (
        <div>
            {/* --------------------------------------filter----------------------------------- */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div >
                            <form className="filter">
                                <div className="Search-autoUser"> <i className="fa-solid search-icon fa-magnifying-glass"></i> <input type={`text`} className="autoUser" placeholder="Search Flight Auto User" onChange={(e) => autoUserFilter(e)} />
                                    <input type={`button`} value={`search`} className="btn-search" onClick={() => GetUser()} />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* -----------------------------------------------------loader---------------------------------------------------------- */}
            {loader ? <div>
                <img src={loadergif} className="loader" />
            </div> : <div>

            </div>}


            {/* --------------------------------------filter----------------------------------- */}
            {load ? <div>
                <div className="container">
                    {user.data ? <div><div className="row autoUser-data">
                        {user.data.map((items, i) => (
                            <div className="col-4">
                                <div className="card">
                                    {/* ----------------------Top--------------- */}
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-xxl-4" >
                                            <span className="dates">
                                                {items.onWordFlight.outBound[0].depDate.slice(0, 10)}
                                            </span>

                                        </div>
                                        <div className="col-12 col-md-6 col-xxl-4" >
                                        </div>
                                    </div>




                                    {/* -------------------Middle----------------                */}
                                    <div className="row Middle2">
                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                <span><i className="fa-solid fa-plane-departure"></i> {items.bookingResponse.bookingDetail.origin} </span>
                                            </div>

                                        </div>
                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                <span><i className="fa-solid fa-plane-arrival"></i> {items.bookingResponse.bookingDetail.destination} </span>
                                            </div>
                                        </div>

                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                <img src={`https://www.travomint.com/resources/images/airline-logo/6E.png`} className="img-airline" />
                                            </div>
                                        </div>
                                        {/* <div className="col-4 plane" >
                                                <div className="airport">
                                                    ₹ {items.tripType == 1 ? items.onWordFlight.fare.grandTotal :
                                                        (items.onWordFlight.fare.grandTotal + items.returnFlight.fare.grandTotal)}
                                                </div>
                                            </div> */}
                                    </div>

                                    <div className="row Middle">
                                        {/* <div className="col-4 plane" >
                                                <div className="airport">
                                                    <span><i className="fa-solid fa-plane-departure"></i> {items.bookingResponse.bookingDetail.origin} </span>
                                                </div>

                                            </div>
                                            <div className="col-4 plane" >
                                                <div className="airport">
                                                    <span><i className="fa-solid fa-plane-arrival"></i> {items.bookingResponse.bookingDetail.destination} </span>
                                                </div>
                                            </div> */}

                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                Customer Fare  <br />₹ {items.bookingResponse.FareDetail[0].baseFare}
                                            </div>
                                        </div>

                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                Backend Fare <br /> ₹ {items.tripType == 1 ? items.onWordFlight.fare.grandTotal :
                                                    (items.onWordFlight.fare.grandTotal + items.returnFlight.fare.grandTotal)}
                                            </div>
                                        </div>

                                        <div className="col-4 plane" >
                                            <div className="airport">
                                                Backend Fare  <br /> ₹ {items.tripType == 1 ? items.onWordFlight.fare.grandTotal :
                                                    (items.onWordFlight.fare.grandTotal + items.returnFlight.fare.grandTotal)}
                                            </div>
                                        </div>

                                    </div>





                                    {/* -------------------Last----------------                */}
                                    <div className="row middle3">
                                        <div className="col-7" >
                                            <span><i className="fa-solid fa-paper-plane"></i> {items.tripType == 1 ? "One Way" : "Two Way"}</span>
                                            &nbsp;&nbsp;
                                            <span> <i className="fa-solid fa-user-gear"></i> {items.gdsType}</span>
                                        </div>
                                        <div className="col-5" >
                                            <button className="btn-book" onClick={() => BookNow(items)} >Book Now</button>
                                        </div>
                                    </div>





                                </div>
                            </div>
                        ))}
                        {/* </table> */}


                    </div></div> : <div>
                        <p className="text-white">No Result Found</p>
                    </div>}
                </div>
            </div> : <div>

            </div>}


            {show ? <div>
                <Modal show={show} onHide={handleClose} className="ModalFull ">
                    <Modal.Header closeButton>
                        <Modal.Title className="text-white"><span className="text-sm">PNR Number :</span> {pnr.data.pnr}</Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body className="btn-ui-site">
                            <section className="">
                                <div className="check"> <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                                </div>


                            </section>

                        </Modal.Body> */}

                </Modal>
            </div> : <div>

            </div>}
        </div>
    )
}
export default AutoCard;