import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

const Data_Table = ({
  columns,
  leads,
  SelectItem,
  conditionalRowStyles,
  data,
}) => {
  return (
    <div className="form-container clearfix">
      <div className="form-box spaces lead-list-tabel clearfix">
        <div className="leads btn-ui-site">
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="id"
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            defaultSortAsc={false}
            pagination
            highlightOnHover
            //   selectableRows
            selectableRowsVisibleOnly
            onSelectedRowsChange={(e) => SelectItem(e)}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Data_Table;
