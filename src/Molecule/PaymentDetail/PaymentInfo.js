import React, { useEffect, useState } from "react";
import {host} from "../../Host";

const PaymentInfo = () => {

    const [Payment, setPayment] = useState([])
    const [load, setLoad] = useState(false)



    function GetPayment() {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", localStorage.getItem('token'));

        var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${host}/payments`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setPayment(result)
                setLoad(true)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }


    console.log("ii".Payment)
    useEffect(() => {
        GetPayment()
    }, [])

    console.log(Payment)

    return (
        <>
            <div>

                <div className="container-fluid">
                    <div className="row PaymentLayout">
                        {load ? <div className="col-12 UserData">
                            <table>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Gateway Name</th>
                                    <th>Booking ID</th>
                                    <th>Order Id</th>
                                    <th>Amount</th>
                                    <th>Transaction Id</th>
                                    <th>Status</th>
                                    <th>Payment Recieved By</th>


                                </tr>

                                {Payment.data != null && Payment.data.length > 0 ? Payment.data.map((items, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{items.gatewayName}</td>
                                        <td>{items.bookingId}</td>
                                        <td>{items.orderId}</td>
                                        <td>{items.amount}</td>
                                        <td>{items.transactionId}</td>
                                        <td>{items.transactionStatus}</td>
                                        <td>{items.paymentReceivedBy.name}</td>

                                    </tr>
                                )) : "No Payment Detail Found"}

                            </table>
                        </div>
                            : <div></div>}

                    </div>


                </div>


            </div>
        </>
    )
}

export default PaymentInfo;