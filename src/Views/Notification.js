import React, { useEffect, useState } from "react";
import { interviewNotificationApi } from "../API/NotificationsApi";
import NotificationCard from "../Custom-Components/NotificationCard";

const Notification = () => {
  const [interviewNotificationDetails, setInterviewNotificationDetails] =
    useState([]);
  const interviewNotificationApiFunc = async () => {
    const data = await interviewNotificationApi();
    setInterviewNotificationDetails(data.data);
  };
  useEffect(() => {
    interviewNotificationApiFunc();
  }, []);
  return (
    <div>
      <NotificationCard
        notificationData={interviewNotificationDetails}
        page="interveiwSchedulePage"
      />
    </div>
  );
};

export default Notification;
