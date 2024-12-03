import React from "react";
import { Button } from "@mui/material";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import moment from "moment";
import useGetLead from "../Hooks/useGetLead";
import { useSelector } from "react-redux";
const NotificationCard = ({ notificationData, page }) => {
  var leads = useGetLead();
  const candidateInfo = useSelector((state) => state.candidateInfo);
  const notificationDataForMap = [];
  for (var candData of leads) {
    for (var intData of notificationData) {
      if (candData.id === intData.candidateId) {
        var notificationObj = {};
        notificationObj.candidateId = intData.candidateId;
        notificationObj.candidateName = candData.name;
        notificationObj.interviewDate = intData.dateOfSeduled;
        notificationObj.dateOfJoining = intData.dateOfJoining;
        notificationObj.jobProfile = candData.subprofile;
        notificationObj.interviwerName = intData.interviewerName;
        notificationDataForMap.push(notificationObj);
      }
    }
  }
  console.log("notificationDataForMap", notificationDataForMap);
  return (
    <>
      <div className="container-1440 py-4">
        <div className="row">
          {notificationData === undefined || notificationData === []
            ? "Loading...."
            : notificationDataForMap.map((items, index) => (
                <div className="col-12 col-md-6 col-xxl-4 mb-3">
                  <div class="form-box clearfix m-0">
                    <div class="container form-content">
                      <h2 class="form-head">{items.candidateName}</h2>
                      <div class="row align-items-end tbal-us">
                        <div class="col-12   d-flex justify-content-start align-items-center border-bottom py-2">
                          <p class="p-2 m-0">
                            <strong>
                              {page === "joiningNotificatioPage"
                                ? "Joining Date: "
                                : "Inteview Date"}
                            </strong>
                          </p>
                          <p class="m-0">
                            {page === "joiningNotificatioPage"
                              ? moment(items.dateOfJoining).format("MMM D YYYY")
                              : moment(items.interviewDate).format(
                                  "MMM D YYYY, h:mm a"
                                )}
                          </p>
                        </div>
                        <div class="col-12   d-flex justify-content-start align-items-center border-bottom py-2">
                          <p class="p-2 m-0">
                            <strong>Interviewer Name: </strong>
                          </p>
                          <p class="m-0">{items.interviwerName}</p>
                        </div>
                        <div class="col-12   d-flex justify-content-start align-items-center border-bottom py-2">
                          <p class="p-2 m-0">
                            <strong>Job Profile: </strong>
                          </p>
                          <p class="m-0">{items.jobProfile}</p>
                        </div>
                        {/* <div class="col-12   d-flex justify-content-start align-items-center border-bottom py-2">
                          <Button
                            variant="contained"
                            className="mt-3"
                            disableElevation
                            style={{
                              fontWeight: "700",
                              fontFamily: '"Quicksand", sans-serif',
                              fontSize: "14px",
                            }}
                            size="large"
                            startIcon={<DownloadDoneIcon />}
                          >
                            Mark As Read
                          </Button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
