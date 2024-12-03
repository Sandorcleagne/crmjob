import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'

import loadergif from "../../Image/loader.gif"
import { Accordion } from "react-bootstrap";
import { host } from "../../Host";



const AutoUsers = () => {

    const [user, setUser] = useState([])
    const [code, setCode] = useState("")
    const [load, setLoad] = useState(false)
    const [changeFare, setChangeFare] = useState(false)
    const [pnr, setpnr] = useState([])
    const [BookData, setBookData] = useState([])
    const [Bookstatus, setBookstatus] = useState(false)
    const [loader, setloader] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [status, SetStatus] = useState(false)

    console.log("check", BookData)

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

        fetch(`${host}/checkAndBook?orderId=` + code, requestOptions)
            .then(response => response.text())
            .then(result => {
                let response = JSON.parse(result)
                setUser(response)
                setUpdatedStatus(response.data != null && response.data.length > 0 ? response.data[0].bookingResponse.paymentgateway != null && response.data[0].bookingResponse.paymentgateway.length > 0 ? response.data[0].bookingResponse.paymentgateway[0].status : "" : "")
                setBookButton(response.data != null && response.data.length > 0 ? response.data[0].bookingResponse.paymentgateway != null && response.data[0].bookingResponse.paymentgateway.length > 0 ? response.data[0].bookingResponse.paymentgateway[0].status : "" : "")
                setLoad(true)
                setloader(false)
            })
            .catch(error => console.log('error', error));
    }




    async function UpdateUser() {
        setUser(user)
        setChangeFare(true)


    }






    function BookConfirm(items) {

        setpnr(items)
        handleShow()
    }




    // DATE AND TIME FORMAT 
    const DetailConvertMinsToTime = ({ data }) => {


        let hours = Math.floor(data / 60);
        let minutes = data % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}hrs: ${minutes}min`;
    };


    // DATE AND TIME FORMAT 
    const ConvertMinsToTime = ({ data }) => {
        let realData = 0;
        for (let i = 0; i < data.length; i++) {
            realData += data[i]
        }

        let hours = Math.floor(realData / 60);
        let minutes = realData % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}hrs: ${minutes}min`;
    };












    console.log("pppppppppppp", user)






    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);



    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);





    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);


    console.log("pnr", pnr)


    function bookConfirm() {
        handleClose()
        SetStatus(true)

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(pnr);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${host}/reviewAndBook`, requestOptions)
            .then(response => response.json())
            .then(result => {

                setBookData(result)
                setBookstatus(true)

                handleShow3(true)
                SetStatus(false)
            })
            .catch(error => console.log('error', error));
    }





    console.log("opy", BookData)

    function Done() {
        window.location.reload()
    }


    const [updateRate, setupdateRate] = useState(false)
    const [UpdatedGateway, setUpdatedGateway] = useState("")
    const [UpdatedTransaction, setUpdatedTransaction] = useState("")
    const [UpdatedAmount, setUpdatedAmount] = useState("")
    const [UpdatedStatus, setUpdatedStatus] = useState("")
    const [BookButton, setBookButton] = useState("")

    function updateRateFunction(e) {
        setupdateRate(true)
        setsaveStatus(true)
        setUpdatedGateway(e.resType)
        setUpdatedTransaction(e.trackingId != null && e.trackingId.length > 0 ? e.trackingId.split("-", 1)[0] : "0")
        setUpdatedAmount(e.amount)
        setUpdatedStatus(e.status)
    }




    const [saveStatus, setsaveStatus] = useState(true)
    function updateRateFunction2() {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-control-allow-origin", "*");



        var raw = JSON.stringify({
            "transactionId": UpdatedTransaction,
            "bookingId": "",
            "orderId": code,
            "transactionStatus": UpdatedStatus,
            "gatewayName": UpdatedGateway,
            "amount": UpdatedAmount
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${host}/savePayment`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUpdatedGateway(result.data.gatewayName)
                setUpdatedTransaction(result.data.transactionId)
                setUpdatedAmount(result.data.amount)
                setUpdatedStatus(result.data.transactionStatus)
                setBookButton(result.data.transactionStatus)
                setupdateRate(false)
                setsaveStatus(false)
            })
            .catch(error => console.log('error', error));

    }


    const onSubmit = (event) => {
        event.preventDefault();
        updateRateFunction2()
        console.log("submission prevented");

    };





    console.log("popo", UpdatedGateway, UpdatedTransaction, UpdatedAmount, UpdatedStatus)


    console.log("check", UpdatedStatus)


    console.log("BOOKDATA", BookData)




    return (
        <>
            <div>

                {/* --------------------------------------search----------------------------------- */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div >
                                <div className="filter" >
                                    <div className="Search-autoUser"> <i className="fa-solid search-icon fa-magnifying-glass"></i>

                                        <input type={`text`} className="autoUser" placeholder="Search Flight Auto User" onChange={(e) => autoUserFilter(e)} />
                                        <input type={`button`} value={`search`} className="btn-search" onClick={() => GetUser()} />

                                    </div>

                                </div>






                            </div>
                        </div>
                    </div>
                </div>


                {/* -----------------------------------------------------loader ---------------------------------------------------------- */}
                {loader ? <div>
                    <img src={loadergif} className="loader" />
                </div> : <div>

                </div>}




                {/* --------------------------------------search END----------------------------------- */}


                {load ?
                    <div>
                        {user.httpStatus == "OK" ? <div>
                            <div className="container">
                                {user.data && user.data.length > 0 ?
                                    <div>

                                        {/* FLIGHT DETAIL AND  PASANGER  */}
                                        <div className="container">
                                            <div>
                                                <div className="row flightDetail">

                                                    {/* FLIGHT DETAIL */}
                                                    {user.data[0].domestic ?
                                                        <div>
                                                            {/* domestic */}
                                                            {user.data[0].tripType == 1 ?
                                                                <div>

                                                                    <div className="col-12 flightDetailTitle">

                                                                        {/* fare Update */}
                                                                        {changeFare ? <h1>{user.data[0].msg}</h1> : ""}
                                                                        {/* fare Update */}

                                                                        {/* DAte */}
                                                                        <span>{user.data[0].onWordFlight.outBound[0].depDate.slice(0, 10)} / </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>


                                                                                <span>
                                                                                    {user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}

                                                                        <button className="TripType"> ONE WAY </button>
                                                                    </div>
                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].onWordFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airline}-{user.data[0].onWordFlight.outBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[0].fromAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        <div className="col-2">
                                                                            <p>


                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].onWordFlight.outBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />

                                                                                {/* } */}
                                                                            </p>
                                                                            <p>{user.data[0].onWordFlight.outBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>


                                                                        <div className="col-2">
                                                                            <button className=" btn-auto " onClick={handleShow1}>Flight Detail</button>
                                                                        </div>


                                                                    </div>


                                                                </div>
                                                                :
                                                                <div>



                                                                    {/* ONWARD */}
                                                                    <div className="col-12 flightDetailTitle">

                                                                        {/* fare Update */}
                                                                        {changeFare ? <h1>{user.data[0].msg}</h1> : ""}
                                                                        {/* fare Update */}

                                                                        {/* DAte */}
                                                                        <span>{user.data[0].onWordFlight.outBound[0].depDate.slice(0, 10)} / </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>

                                                                                <span>
                                                                                    {user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}
                                                                        <button className="TripType"> ROUND TRIP </button>
                                                                    </div>


                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].onWordFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airline}-{user.data[0].onWordFlight.outBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[0].fromAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        <div className="col-2">
                                                                            <p>


                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].onWordFlight.outBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />
                                                                            </p>
                                                                            <p>{user.data[0].onWordFlight.outBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>


                                                                        <div className="col-2">
                                                                            <button className="btn-auto " onClick={handleShow1}>Flight Detail</button>
                                                                        </div>


                                                                    </div>
                                                                    {/* ONWARD */}



                                                                    {/* RETURN */}
                                                                    <div className="col-12 flightDetailTitle">



                                                                        {/* DAte */}
                                                                        <span>{user.data[0].returnFlight.inBound[0].depDate.slice(0, 10)} / </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>

                                                                                <span>
                                                                                    {user.data[0].returnFlight.inBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}
                                                                    </div>

                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].returnFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].returnFlight.inBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].returnFlight.inBound[0].airline}-{user.data[0].returnFlight.inBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].returnFlight.inBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].returnFlight.inBound[0].fromAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].returnFlight.inBound[user.data[0].returnFlight.inBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].returnFlight.inBound[user.data[0].returnFlight.inBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        <div className="col-2">
                                                                            <p>
                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].returnFlight.inBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />
                                                                                {/* } */}
                                                                            </p>
                                                                            <p>{user.data[0].returnFlight.inBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].returnFlight.inBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].returnFlight.inBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].returnFlight.inBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>


                                                                        <div className="col-2">
                                                                            <button className="btn-auto " onClick={handleShow2}>Flight Detail</button>
                                                                        </div>


                                                                    </div>

                                                                    {/* RETURN */}


                                                                </div>}
                                                            {/* domestic */}

                                                        </div>
                                                        :
                                                        <div>
                                                            {/* INTERNATIONAL */}
                                                            {user.data[0].tripType == 1 ?
                                                                <div>
                                                                    {/* ONE way */}
                                                                    <div className="col-12 flightDetailTitle">

                                                                        {/* fare Update */}
                                                                        {changeFare ? <h1>{user.data[0].msg}</h1> : ""}
                                                                        {/* fare Update */}

                                                                        {/* DAte */}
                                                                        <span>{user.data[0].onWordFlight.outBound[0].depDate.slice(0, 10)} / </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>

                                                                                <span>
                                                                                    {user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}
                                                                        <button className="TripType"> ONE WAY </button>
                                                                    </div>

                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].onWordFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airline}-{user.data[0].onWordFlight.outBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[0].fromAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        <div className="col-2">
                                                                            <p>
                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].onWordFlight.outBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />
                                                                            </p>
                                                                            <p>{user.data[0].onWordFlight.outBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>


                                                                        <div className="col-2">
                                                                            <button className=" btn-auto " onClick={handleShow1}>Flight Detail</button>
                                                                        </div>


                                                                    </div>
                                                                    {/* ONE way */}

                                                                </div> :
                                                                <div>



                                                                    {/* ONWARD */}
                                                                    <div className="col-12 flightDetailTitle">

                                                                        {/* fare Update */}
                                                                        {changeFare ? <h1>{user.data[0].msg}</h1> : ""}
                                                                        {/* fare Update */}

                                                                        {/* DAte */}
                                                                        <span>{user.data[0].onWordFlight.outBound[0].depDate.slice(0, 10)} / &nbsp; </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>

                                                                                <span>
                                                                                    {user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}
                                                                        <button className="TripType"> ROUND TRIP </button>
                                                                    </div>


                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].onWordFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].onWordFlight.outBound[0].airline}-{user.data[0].onWordFlight.outBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[0].fromAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.outBound[user.data[0].onWordFlight.outBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        <div className="col-2">
                                                                            <p>


                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].onWordFlight.outBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />

                                                                            </p>
                                                                            <p>{user.data[0].onWordFlight.outBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].onWordFlight.outBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>


                                                                        <div className="col-2">
                                                                            <button className="btn-auto " onClick={handleShow1}>Flight Detail</button>
                                                                        </div>


                                                                    </div>
                                                                    {/* ONWARD */}



                                                                    {/* RETURN */}
                                                                    <div className="col-12 flightDetailTitle">

                                                                        {/* DAte */}
                                                                        <span>{user.data[0].onWordFlight.inBound[0].depDate.slice(0, 10)} / </span>
                                                                        {/* DAte */}

                                                                        {/* Time */}
                                                                        <span>
                                                                            <b>

                                                                                <span>
                                                                                    {user.data[0].onWordFlight.inBound[0].depDate.split('T', 2)[1]}
                                                                                </span>

                                                                            </b>
                                                                        </span>
                                                                        {/* Time */}
                                                                        <button className="TripType"> ROUND TRIP </button>
                                                                    </div>

                                                                    <div className="row flightDetailData">

                                                                        {/* NAME AND PIc */}
                                                                        <div className="col-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <img src={`https://www.travomint.com/resources/images/airline-logo/${user.data[0].onWordFlight.airline}.png`} className="" width={`100%`} />
                                                                                </div>
                                                                                <div className="col-9">
                                                                                    <p>{user.data[0].onWordFlight.inBound[0].airlineName}</p>
                                                                                    <p>{user.data[0].onWordFlight.inBound[0].airline}-{user.data[0].onWordFlight.inBound[0].flightNo}</p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        {/* NAME AND PIc */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.inBound[0].depDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.inBound[0].fromAirport}</p>
                                                                            Number
                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}


                                                                        {/* DEparture and FLIGHT  */}
                                                                        <div className="col-2">
                                                                            <p><b>
                                                                                <span>{user.data[0].onWordFlight.inBound[user.data[0].onWordFlight.inBound.length - 1].reachDate.split('T', 2)[1]}</span>
                                                                            </b></p>
                                                                            <p> {user.data[0].onWordFlight.inBound[user.data[0].onWordFlight.inBound.length - 1].toAirport}</p>

                                                                        </div>
                                                                        {/* DEparture and FLIGHT  */}

                                                                        {/* GAP */}
                                                                        <div className="col-2">
                                                                            <p>
                                                                                <ConvertMinsToTime
                                                                                    data={
                                                                                        [...user.data[0].onWordFlight.inBound.map((item, i) => (item.eft + item.layOverTime))]
                                                                                    }
                                                                                />

                                                                                {/* } */}
                                                                            </p>
                                                                            <p>{user.data[0].onWordFlight.inBound[0].cabinClass == 1 ? "Economy" : ""}{user.data[0].onWordFlight.inBound[0].cabinClass == 2 ? "Premium Economy" : ""}{user.data[0].onWordFlight.inBound[0].cabinClass == 3 ? "Business" : ""}{user.data[0].onWordFlight.inBound[0].cabinClass == 4 ? "First" : ""}</p>
                                                                        </div>
                                                                        {/* GAP */}

                                                                        <div className="col-2">
                                                                            <button className="btn-auto" onClick={handleShow2}>Flight Detail</button>
                                                                        </div>


                                                                    </div>

                                                                    {/* RETURN */}


                                                                </div>}
                                                            {/* INTERNATIONAL */}
                                                        </div>
                                                    }
                                                    {/* FLIGHT DETAIL */}



                                                    <hr className="black-line" />
                                                    {/*------------------------------ Passanger Detail ---------------------------------------   */}
                                                    <div className="row flightDetailData">


                                                        <div className="row">
                                                            <div className="col-2 head">Sr</div>
                                                            <div className="col-3 head">Name</div>
                                                            <div className="col-3 head">PNR Status</div>
                                                            <div className="col-2 head">PNR Number</div>
                                                            <div className="col-2 head">Meal and Baggage</div>
                                                        </div>
                                                        {user.data[0].bookingResponse.PassengerDetails.map((items, i) => (
                                                            <div className="row">
                                                                <div className="col-2 ">{i + 1}</div>
                                                                <div className="col-3 ">{items.paxFirstName} {items.paxMiddleName} {items.paxLastName}</div>
                                                                <div className="col-3 ">{user.data[0].onWordFlight.outBound[0].fromAirport}-{user.data[0].onWordFlight.outBound[0].toAirport}: {user.data[0].bookingResponse.bookingDetail.bookingStatus == "pending" ? <div>{`Pending`}</div> : <span>{user.data[0].bookingResponse.bookingDetail.bookingStatus}</span>}</div>
                                                                <div className="col-2 ">{user.data[0].bookingResponse.bookingDetail.pnrConfirmation != null ? user.data[0].bookingResponse.bookingDetail.pnrConfirmation : ""}</div>
                                                                <div className="col-2 ">NA</div>
                                                            </div>))}


                                                    </div>
                                                    {/*------------------------------ Passanger Detail ---------------------------------------   */}

                                                    {/* PAyment DEATIL */}
                                                    <div className="row flightDgetailData1">

                                                        <div className="flightDetailTitle payment-detail">
                                                            Payment Detail
                                                        </div>
                                                        <div className="flightDetailData">

                                                            <div className="row">

                                                                <div className="col-2 head">Payment Gateway</div>
                                                                <div className="col-3 head">Transaction ID</div>
                                                                <div className="col-3 head">Amount</div>
                                                                <div className="col-2 head">Status</div>
                                                                <div className="col-2 head"></div>
                                                            </div>

                                                            {updateRate ?
                                                                <div className="row">
                                                                    <form className="updatedForm" onSubmit={onSubmit}>
                                                                        <div className="col-2">
                                                                            <select id="framework" className="addUserData" required onChange={(e) => setUpdatedGateway(e.target.value)}>
                                                                                <option value={UpdatedGateway}>Select Gateway</option>
                                                                                <option value="PayTM">PayTM</option>
                                                                                <option value="PayU">PayU</option>
                                                                                <option value="ccAvenue">CCAvenue</option>
                                                                                <option value="RazorPay">RazorPay</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <input type={`text`} placeholder={UpdatedTransaction} required className="transaction" onChange={(e) => setUpdatedTransaction(e.target.value)} />
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <input type={`text`} placeholder={UpdatedAmount} required className="amount" onChange={(e) => setUpdatedAmount(e.target.value)} />
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <select id="framework" className="addUserData" required onChange={(e) => setUpdatedStatus(e.target.value)}>
                                                                                <option value={UpdatedStatus}>Select Status</option>
                                                                                <option value="Success">Success</option>
                                                                                <option value="Failure">Failure</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-2"><input type="submit" className="btn-auto" value={`Save`} /></div>
                                                                    </form>
                                                                </div> :

                                                                <div>
                                                                    {saveStatus ? <div className="row">
                                                                        <div className="col-2">{user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0].resType : " "}</div>
                                                                        <div className="col-3">{user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0].trackingId.split("-", 1) : " "}</div>
                                                                        <div className="col-3">{user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0].amount : " "}</div>
                                                                        <div className="col-2">{user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0].status : " "}</div>
                                                                        <div className="col-2">{UpdatedStatus == "Success" ? "" : <button className="btn-auto" onClick={(e) => updateRateFunction(user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0] : "")}>Update</button>}</div>
                                                                    </div> : <div className="row">
                                                                        <div className="col-2">{UpdatedGateway}</div>
                                                                        <div className="col-3">{UpdatedTransaction}</div>
                                                                        <div className="col-3">{UpdatedAmount}</div>
                                                                        <div className="col-2">{UpdatedStatus}</div>
                                                                        <div className="col-2">{UpdatedStatus == "Success" ? "" : <button className="btn-auto" onClick={(e) => updateRateFunction(user.data[0].bookingResponse.paymentgateway != null && user.data[0].bookingResponse.paymentgateway.length > 0 ? user.data[0].bookingResponse.paymentgateway[0] : "")}>Update</button>}</div>
                                                                    </div>}
                                                                </div>

                                                            }

                                                            {/* {updateRate ?  : <div></div>} */}

                                                        </div>



                                                    </div>
                                                    {/* PAyment DEATIL END */}


                                                </div>
                                            </div>

                                        </div>




                                        {/* ----------------------------------------------FARE Summary --------------------------------------------*/}
                                        <div className="container fare-summary-Box">
                                            <div className="row flightDetail">
                                                <div className="col-12 flightDetailTitle">
                                                    Fare Summary
                                                </div>
                                                <div className="titleFare">
                                                    <div className="row fareTitleINFO2">
                                                        <div className="col-2 head">Supplier</div>
                                                        <div className="col-2 head">Booking Amount</div>
                                                        <div className="col-2 head">Backend Amount</div>
                                                        <div className="col-2 head">Profit</div>
                                                        <div className="col-2 head">Detail</div>
                                                        <div className="col-2 head"></div>
                                                    </div>
                                                </div>

                                                {user.data.map((items, i) => (
                                                    <div>



                                                        {items.domestic ?
                                                            <div>


                                                                {items.tripType === 1 ? <div>
                                                                    <div className="row flightDetailData">

                                                                        <div className="fareDetailINFO">

                                                                            <Accordion >
                                                                                <div className="row">

                                                                                    <div className="col-2">{items.gdsType}</div>
                                                                                    <div className="col-2">{items.bookingResponse.FareDetail[0].grandTotal}</div>
                                                                                    <div className="col-2">{(items.onWordFlight.fare.grandTotal).toFixed(2)} </div>
                                                                                    <div className="col-2">{((items.bookingResponse.FareDetail[0].grandTotal - items.onWordFlight.fare.grandTotal) + (items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netCommission : 0)).toFixed(2)}</div>
                                                                                    <div className="col-2">  {items.onWordFlight.fare.fareDetail != null ? <Accordion.Item eventKey="0"> <Accordion.Header>More Detail</Accordion.Header>  </Accordion.Item> : "No Detail Found"}</div>
                                                                                    <div className="col-2">{((items.bookingResponse.bookingDetail.bookingStatus == "PENDING" || items.bookingResponse.bookingDetail.bookingStatus == "BKGFAIL") && BookButton == "Success") ? <button className="btn-Book float-right" onClick={() => BookConfirm(items)}>Book Now</button> : <span></span>}</div>
                                                                                    {/* <td><button className="btn-Book" onClick={() => BookConfirm(items)}>Book Now</button></td> */}
                                                                                </div>



                                                                                <Accordion.Item eventKey="0">

                                                                                    <Accordion.Body>
                                                                                        <div className="row fareTitleINFO">
                                                                                            <div className="col-2 head">
                                                                                                Base Amount
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Fare Identifier
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Net Commission
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Net Fare
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Total Fare
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Total Tax
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row">
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.baseAmount : 0}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.fareIdentifier : "No"}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netCommission : 0}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netFare : 0}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.totalFare : 0}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.totalTax : 0}</div>
                                                                                        </div>
                                                                                    </Accordion.Body>
                                                                                </Accordion.Item>


                                                                            </Accordion>
                                                                        </div>



                                                                    </div>
                                                                </div> :
                                                                    <div>
                                                                        <div className="row flightDetailData">

                                                                            <Accordion>

                                                                                <div className="row">
                                                                                    <div className="col-2">{items.gdsType}</div>
                                                                                    <div className="col-2">{items.bookingResponse.FareDetail[0].grandTotal}</div>
                                                                                    <div className="col-2">{(items.onWordFlight.fare.grandTotal + items.returnFlight.fare.grandTotal).toFixed(2)} </div>
                                                                                    <div className="col-2">{((items.bookingResponse.FareDetail[0].grandTotal - (items.onWordFlight.fare.grandTotal + items.returnFlight.fare.grandTotal)) + (items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netCommission : 0 + items.onWordFlight.fare.fareDetail != null ? items.returnFlight.fare.fareDetail.netCommission : 0)).toFixed(2)}</div>
                                                                                    <div className="col-2">{items.onWordFlight.fare.fareDetail != null ? <Accordion.Item eventKey="1"> <Accordion.Header>More Detail</Accordion.Header>  </Accordion.Item> : "No Detail Found"} </div>
                                                                                    <div className="col-2">{((items.bookingResponse.bookingDetail.bookingStatus == "PENDING" || items.bookingResponse.bookingDetail.bookingStatus == "BKGFAIL") && BookButton == "Success") ? <button className="btn-Book float-right" onClick={() => BookConfirm(items)}>Book Now</button> : <span></span>}</div>
                                                                                    {/* <td><button className="btn-Book" onClick={() => BookConfirm(items)}>Book Now</button></td> */}
                                                                                </div>

                                                                                <Accordion.Item eventKey="1">

                                                                                    <Accordion.Body>
                                                                                        <div className="row fareTitleINFO">
                                                                                            <div className="col-2 head">
                                                                                                Base Amount
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Fare Identifier
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Net Commission
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Net Fare
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Total Fare
                                                                                            </div>
                                                                                            <div className="col-2 head">
                                                                                                Total Tax
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row">
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.baseAmount + items.returnFlight.fare.fareDetail.baseAmount}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.fareIdentifier + "/" + items.returnFlight.fare.fareDetail.fareIdentifier}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netCommission + items.returnFlight.fare.fareDetail.netCommission}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netFare + items.returnFlight.fare.fareDetail.totalFare}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalFare + items.returnFlight.fare.fareDetail.totalFare}</div>
                                                                                            <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalTax + items.returnFlight.fare.fareDetail.totalTax}</div>
                                                                                        </div>
                                                                                    </Accordion.Body>
                                                                                </Accordion.Item>
                                                                            </Accordion>


                                                                        </div>
                                                                    </div>}
                                                            </div>
                                                            :
                                                            <div>
                                                                {items.tripType === 1 ? <div>
                                                                    <div className="row flightDetailData">




                                                                        <Accordion>
                                                                            <div className="row">
                                                                                <div className="col-2">{items.gdsType}</div>
                                                                                <div className="col-2">{items.bookingResponse.FareDetail[0].grandTotal}</div>
                                                                                <div className="col-2">{(items.onWordFlight.fare.grandTotal).toFixed(2)} </div>
                                                                                <div className="col-2">{((items.bookingResponse.FareDetail[0].grandTotal - items.onWordFlight.fare.grandTotal) + (items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netCommission : 0)).toFixed(2)}</div>
                                                                                <div className="col-2"> {items.onWordFlight.fare.fareDetail != null ? <Accordion.Item eventKey="2"> <Accordion.Header>More Detail</Accordion.Header>  </Accordion.Item> : "No Detail Found"}</div>
                                                                                <div className="col-2">{(items.bookingResponse.bookingDetail.bookingStatus == "PENDING" || items.bookingResponse.bookingDetail.bookingStatus == "BKGFAIL") && BookButton == "Success" ? <span> <button className="btn-Book float-right" onClick={() => BookConfirm(items)}>Book Now</button></span> : <span></span>}</div>
                                                                                {/* <td><button className="btn-Book" onClick={() => BookConfirm(items)}>Book Now</button></td> */}
                                                                            </div>

                                                                            <Accordion.Item eventKey="3">

                                                                                <Accordion.Body>
                                                                                    <div className="row fareTitleINFO">
                                                                                        <div className="col-2 head">
                                                                                            Base Amount
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Fare Identifier
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Net Commission
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Net Fare
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Total Fare
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Total Tax
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.baseAmount}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.fareIdentifier}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netCommission}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netFare}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalFare}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalTax}</div>
                                                                                    </div>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>

                                                                        </Accordion>
                                                                    </div>
                                                                </div> : <div>
                                                                    <div className="row flightDetailData">


                                                                        <Accordion>

                                                                            <div className="row">
                                                                                <div className="col-2">{items.gdsType}</div>
                                                                                <div className="col-2">{items.bookingResponse.FareDetail[0].grandTotal}</div>
                                                                                <div className="col-2">{(items.onWordFlight.fare.grandTotal).toFixed(2)} </div>
                                                                                <div className="col-2">{((items.bookingResponse.FareDetail[0].grandTotal - items.onWordFlight.fare.grandTotal) + (items.onWordFlight.fare.fareDetail != null ? items.onWordFlight.fare.fareDetail.netCommission : 0)).toFixed(2)}</div>
                                                                                <div className="col-2"> {items.onWordFlight.fare.fareDetail != null ? <Accordion.Item eventKey="4"> <Accordion.Header>More Detail</Accordion.Header>  </Accordion.Item> : "No Detail Found"} </div>
                                                                                <div className="col-2">{(items.bookingResponse.bookingDetail.bookingStatus == "PENDING" || items.bookingResponse.bookingDetail.bookingStatus == "BKGFAIL") && BookButton == "Success" ? <span><button className="btn-Book float-right" onClick={() => BookConfirm(items)}>Book Now</button></span> : <span></span>}</div>
                                                                                {/* <td><button className="btn-Book" onClick={() => BookConfirm(items)}>Book Now</button></td> */}

                                                                            </div>

                                                                            <Accordion.Item eventKey="4">

                                                                                <Accordion.Body>
                                                                                    <div className="row fareTitleINFO">
                                                                                        <div className="col-2 head">
                                                                                            Base Amount
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Fare Identifier
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Net Commission
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Net Fare
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Total Fare
                                                                                        </div>
                                                                                        <div className="col-2 head">
                                                                                            Total Tax
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.baseAmount}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.fareIdentifier}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netCommission}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.netFare}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalFare}</div>
                                                                                        <div className="col-2 ">{items.onWordFlight.fare.fareDetail.totalTax}</div>
                                                                                    </div>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>

                                                                        </Accordion>

                                                                    </div>
                                                                </div>}
                                                            </div>}
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                        {/* ----------------------------------------------FARE Summary END --------------------------------------------*/}














                                    </div> :
                                    <div>
                                        <p className="text-white">No Result Found</p>
                                    </div>
                                }
                            </div>
                        </div> : <div>
                            {user.msg == "Pnr has been generated already" ?
                                <div className="Pre-Search">

                                    {user.data != null ?
                                        <div>
                                            <table>
                                                <tr>
                                                    <th>Booking Date</th>
                                                    <th>Origin</th>
                                                    <th>Destination</th>
                                                    <th>PNR</th>
                                                    <th>Booking Recieved Ammount</th>
                                                    <th>Booking Done Ammount</th>
                                                </tr>


                                                <tr>
                                                    <td>{user.data.bookingDate}</td>
                                                    <td>{user.data.origin}</td>
                                                    <td>{user.data.destination}  </td>
                                                    <td>{user.data.pnr} </td>
                                                    <td>{user.data.receivedBooking.amount} </td>
                                                    <td>{user.data.doneBooking.amount} </td>
                                                </tr>




                                            </table>
                                            <button className="btn btn-success Okay" onClick={() => Done()}>Okay</button>
                                        </div>

                                        : <table>

                                        </table>}



                                </div>
                                : <div><h1>{user.msr}</h1></div>}</div>}
                    </div> : <div>
                    </div>}






                {status == true ?
                    <div><img src={loadergif} className="loadergif" />
                    </div>
                    :
                    <div></div>}



                {Bookstatus ?
                    <div>
                        <Modal show={show3} onHide={handleClose3} className="ModalFull ">
                            <Modal.Header closeButton>
                                <Modal.Title classame="texNt-white">Confirmation:</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="btn-ui-site">


                                <div>


                                    <table>
                                        <tr>
                                            <th>Booking Date</th>
                                            <th>Origin</th>
                                            <th>Destination</th>
                                            <th>PNR</th>
                                            <th>Booking Recieved Ammount</th>
                                            <th>Booking Done Ammount</th>
                                        </tr>


                                        <tr>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.bookingDate : ""}</td>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.origin : ""}</td>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.destination : ''}  </td>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.pnr : ""} </td>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.receivedBooking.amount : ""} </td>
                                            <td>{BookData != null && BookData.length > 0 ? BookData.data.doneBooking.amount : ""} </td>
                                        </tr>




                                    </table>



                                </div>


                            </Modal.Body>
                            <Modal.Footer className="btn-ui-site">
                                <button variant="success" onClick={() => Done()}>
                                    Okay
                                </button>
                            </Modal.Footer>


                        </Modal>
                    </div> :
                    <div>
                    </div>}



                <Modal show={show} onHide={handleClose} className="ModalFull ">
                    <Modal.Header closeButton>
                        <Modal.Title classame="texNt-white">Confirmation:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="btn-ui-site">
                        {/* {user.data[0].bookingResponse? "Your PNR no. is This":"NO"} */}
                        <p>Do you Want to Procced for booking. </p>
                        <button className="btn btn-danger" onClick={() => bookConfirm()}> YES</button> &nbsp; <button className="btn btn-success" onClick={handleClose}>NO</button>
                    </Modal.Body>

                </Modal>


                {load ? <div>

                    {user.data != null && user.data.length > 0 ?
                        <div>
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Onward Flight Detail </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="btn-ui-site">


                                    <div>
                                        <div>
                                            {user.data[0].domestic ? <div>
                                                {user.data[0].onWordFlight.outBound.map((items, i) => (
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p>{items.airlineName}</p>
                                                            <p>{items.airline}{items.flightID}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p>{items.depDate}</p>
                                                            <p>{items.fromAirport}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p>{items.reachDate}</p>
                                                            <p>{items.toAirport}</p>
                                                        </div>
                                                        <div className="col-3">


                                                            <DetailConvertMinsToTime
                                                                data={
                                                                    items.eft +
                                                                    items.layOverTime
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div> : <div>
                                                {user.data[0].onWordFlight.outBound.map((items, i) => (
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p>{items.airlineName}</p>
                                                            <p>{items.airline}{items.flightID}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p>{items.depDate}</p>
                                                            <p>{items.fromAirport}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p>{items.reachDate}</p>
                                                            <p>{items.toAirport}</p>
                                                        </div>
                                                        <div className="col-3">


                                                            <DetailConvertMinsToTime
                                                                data={
                                                                    items.eft +
                                                                    items.layOverTime
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>}
                                        </div>
                                    </div>
                                </Modal.Body>

                            </Modal>



                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Return Flight Detail</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="btn-ui-site">


                                    <div>
                                        {user.data[0].domestic ?
                                            <div>
                                                <div>
                                                    {user.data[0].tripType == 2 ? <div>
                                                        {user.data[0].returnFlight.inBound.map((items, i) => (
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    <p>{items.airlineName}</p>
                                                                    <p>{items.airline}{items.flightID}</p>
                                                                </div>
                                                                <div className="col-3">
                                                                    <p>{items.depDate}</p>
                                                                    <p>{items.fromAirport}</p>
                                                                </div>
                                                                <div className="col-3">
                                                                    <p>{items.reachDate}</p>
                                                                    <p>{items.toAirport}</p>
                                                                </div>
                                                                <div className="col-3">


                                                                    <DetailConvertMinsToTime
                                                                        data={
                                                                            items.eft +
                                                                            items.layOverTime
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div> : <div>

                                                    </div>}
                                                </div>
                                            </div>

                                            : <div>
                                                <div>
                                                    {user.data[0].tripType == 2 ? <div>{user.data[0].onWordFlight.inBound.map((items, i) => (
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <p>{items.airlineName}</p>
                                                                <p>{items.airline}{items.flightID}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p>{items.depDate}</p>
                                                                <p>{items.fromAirport}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p>{items.reachDate}</p>
                                                                <p>{items.toAirport}</p>
                                                            </div>
                                                            <div className="col-3">


                                                                <DetailConvertMinsToTime
                                                                    data={
                                                                        items.eft +
                                                                        items.layOverTime
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}</div> : <div></div>}
                                                </div>
                                            </div>}

                                    </div>
                                </Modal.Body>

                            </Modal>

                        </div> : <div></div>}

                </div> : <div>

                </div>}



































            </div>

        </>
    )
}

export default AutoUsers;