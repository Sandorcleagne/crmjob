import React, { useEffect, useState } from "react";
import Form_Input from "../../Custom-Components/Form_Input";
import { useSelector } from "react-redux";
import { apiurl, authCode } from "../../Host";
import { Table } from "react-bootstrap";
import swal from "sweetalert";
import { DeleteImageByID } from "../../API/DeleteProducyImage";

const AddProductImages = ({ productId, productSku }) => {
  const auth = useSelector((state) => state.auth);
  const [oldImages, setOldImages] = useState([]);
  var imageName = "";

  const getFileName = (e) => {
    imageName = e.target.value;
  };

  const uploadImages = (e) => {
    swal({
      title: "Are you sure?",
      text:
        "Will be Uploaded as an attched Document for this BookingID - " +
        productSku.productSku,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var formdata = new FormData();
        formdata.append("userId", auth.userData.userId);
        formdata.append("userName", auth.userData.userName);
        formdata.append("fileName", imageName);
        formdata.append("file", e.target.files[0]);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        console.log(
          apiurl +
            "/uploadImages/" +
            productId.productId +
            "/" +
            productSku.productSku +
            "?authCode=" +
            authCode
        );
        fetch(
          apiurl +
            "/uploadImages/" +
            productId.productId +
            "/" +
            productSku.productSku +
            "?authCode=" +
            authCode,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("result:", result);
            if (result.statusCode == 200) {
              swal("Good job!", result.message, "success");
              // getExistingDocs();
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        swal("Your request is cancelled", {
          icon: "error",
        });
      }
    });
  };

  const getExistingImages = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      apiurl +
        "/getExistingImages/" +
        productId.productId +
        "?authCode=" +
        authCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOldImages(result);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteImage = (id) => {
    alert(id);
  };
  useEffect(() => getExistingImages(), []);
  return (
    <>
      <div className="form-box clearfix">
        <h1 className="form-head">
          <i className="fa-solid page-icon fa-image"></i>&nbsp;Upload Images For <i class="fa-solid fa-angle-right anglpdod"></i> 
          <span className="form-head-product">{productSku.productSku}</span>
        </h1>
        <form>
          <div className="container form-content">
            <div className="row">
              <>
                <div className="col-3">
                  <Form_Input
                    label="Image Refrence"
                    type="text"
                    name="documentName"
                    onChange={(e) => getFileName(e)}
                  />
                </div>
                <div className="col-3">
                  <Form_Input
                    label="Image"
                    type="file"
                    name="document"
                    accept="application/pdf,image/jpeg"
                    onChange={(e) => uploadImages(e)}
                  />
                </div>
              </>
            </div>
          </div>
        </form>
      </div>
      <div className="form-box clearfix">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Image Refrence</th>
              <th>Date</th>
              <th>Document</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {oldImages.map((item) => (
              <tr>
                <td>{item.imageName}</td>
                <td>{item.createDate}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={
                      "https://vacationjavaapi.travomint.com/images-holidays/resources/images/" +
                      item.imageRefrenceName
                    }
                    target="__black"
                  >
                    <b>Open</b>
                  </a>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteImageByID(item.id)}
                  >
                    Masyank
                  </button>
                </td>
                {/* <td><a className="btn btn-danger" onClick={() => deleteImage(item.id)}>Delete</a></td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AddProductImages;
