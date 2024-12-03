import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {host} from "../../Host";

import { Link } from "react-router-dom";
const BookingLists = () => {

    const [list, setlist] = useState([])
    const [status, setstatus] = useState(false)
    const [check, setcheck] = useState("")


    const pageblgid = useParams();

    async function GetList() {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${host}/findAllBookings`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)
                setlist(data)
                setstatus(true)
            })
            .catch(error => console.log('error', error));
    }
    function filterData() {

    }
    function autoUserFilter(e) {

        setcheck(e.target.value)
    }



    
    const freeAllbatch = []
    if (status == true) {
        const chunkSize = 5
        const arr = list.data
        const groups = arr
            .map((e, i) => {
                return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null
            })
            .filter((e) => {
                return e
            })
        freeAllbatch.push(groups)
    }


    const [pagination_st, setPaginationst] = useState(0)
    const [parinum, setParinum] = useState([])

    function setPaginationLeft(e) {
        // if (pagination_st == 0) {
        // } else {
        //     setPaginationst(pagination_st - 1)
        // }
    }

    function setPaginationRight(e) {
        // if (pagination_st == freeAllbatch[0]?.length - 1) {
        // } else {
        //     setPaginationst(pagination_st + 1)
        // }
    }
    


    console.log("pagination",freeAllbatch)

    useEffect(() => {
       

        GetList()
    }, [])

    useEffect(() => {
        if(pageblgid.id != undefined || pageblgid.id){
         setPaginationst(pageblgid.id-1)
        }
         window.scrollTo(0, 0);
     }, [pageblgid])

    console.log(list)
    return (
        <>
            {status ? <div className="container-fluid ">
                <div className="row">


                </div>
                <div className="row BookingLayout">
                    <div className="col-12 ">
                        <div className="list-Booking">
                            <table className="booktable">
                                <tr>
                                    <th>Booking Date</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Trip Type</th>
                                    <th>PNR</th>
                                    <th>Booking ID</th>
                                    <th>Order ID</th>
                                    <th>Recieved <br/> Booking</th>
                                    <th>Confirmed <br/> Booking</th>
                                    <th>Booking <br/> Recieved <br/> Supplier</th>
                                    <th>Booking <br/> Done <br/> Supplier</th>
                                    <th>Agent Name</th>
                                    <th>Source</th>
                                </tr>

                                { freeAllbatch[0].length > 0 ? 
                                (freeAllbatch[0][pagination_st].map((item, i) => (
                                    <tr>
                                        <td>{new Date(item.bookingDate).toLocaleDateString()} {new Date(item.bookingDate).toLocaleTimeString()}</td>
                                        <td> <i className="fa-solid fa-plane-departure"></i> {item.origin}</td>
                                        <td> <i className="fa-solid fa-plane-arrival"></i> {item.destination}</td>
                                        <td>{item.tripType == 1 ? "One Way" : "Two Way"}</td>
                                        <td>{item.pnr}</td>
                                        <td>{item.bookingId}</td>
                                        <td>{item.orderId != null ? item.orderId : "---"}</td>
                                        <td> ₹ {item.receivedBooking.amount}</td>
                                        <td> ₹ {item.doneBooking.amount}</td>
                                        <td>{item.receivedBooking.gds}</td>
                                        <td>{item.doneBooking.gds}</td>
                                        <td>{item != null && item.bookingBy != null ? item.bookingBy.name: "---"}</td>
                                        <td>{item != null && item.source != null ? item.source : "---"}</td>
                                    </tr>

                                ))):( 
                                    <div className="overflow-hidden text-center">
                                    <div className="lds-ellipsis">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                )}






                               
                            </table>
                        </div>
                    </div>
                </div>

        

                
            </div> : <div></div>}
        </>
    )
}

export default BookingLists;