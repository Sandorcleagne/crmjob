import { Skeleton } from "@mui/material";
import React from "react";

const CandidateInfoSekeleton = () => {
  return (
    <div className="form-box clearfix">
      <div className="container form-content">
        <h2 className="form-head">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </h2>
        <Skeleton variant="rounded" width={210} height={60} />
      </div>
    </div>
  );
};

export default CandidateInfoSekeleton;
