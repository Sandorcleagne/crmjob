import React, { useEffect, useState } from "react";
import { joiningNotification } from "../API/NotificationsApi";
import NotificationCard from "../Custom-Components/NotificationCard";
const JoiningNotification = () => {
  const [joiningNotificationDetails, setJoiningNotificationDetails] = useState(
    []
  );
  const joiningNotificationApiFunc = async () => {
    const data = await joiningNotification();
    console.log("data", data);
    setJoiningNotificationDetails(data.data);
  };
  useEffect(() => {
    joiningNotificationApiFunc();
  }, []);
  return (
    <div>
      <NotificationCard
        notificationData={joiningNotificationDetails}
        page="joiningNotificatioPage"
      />
    </div>
  );
};

export default JoiningNotification;
