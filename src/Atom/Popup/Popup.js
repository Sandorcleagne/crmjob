import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from "react-router";
import tick from "../../Image/tick.gif"

export default function PopUpSuccess() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();


    useEffect(() => {
        handleShow()

        setTimeout(function () {
            navigate("/Dashboard")
        }, 2000);


        setTimeout(function () {
            handleClose()
        }, 2000);
    }, [])

    return (
        <>
            <Modal className="student-coursepopup successrequest" show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {/* <Modal.Header closeButton>Welcome to the Universe of Travel</Modal.Header> */}
                <Modal.Body className="p-0 mt-1/5">
                    <section className="">
                        <div className="wrapper"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        </div>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    )
}
