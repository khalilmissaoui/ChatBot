/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { CChartPie } from "@coreui/react-chartjs";
import {
  CBadge,
  CModal,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import React, { Component } from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

const getBadge = (status) => {
  switch (status) {
    case "fixed":
      return "success";
    case "Not_fixed":
      return "danger";
    default:
      return "primary";
  }
};
var solvedReports = 0;
var unSolvedReports = 0;

const fields = [
  "name",
  "send_date",
  "role",
  "description",
  "status",
  "Delete_report",
];
const deleteReport = (id) => {
  Axios.delete(`http://localhost:3001/report/delete/${id}`);
};

function Reports() {
  const [danger, setDanger] = useState(false);
  const [reportsList, setReportsList] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState("fixed");
  // eslint-disable-next-line no-lone-blocks
  {
    reportsList.map((report) =>
      report.status === "fixed" ? (solvedReports += 1) : (unSolvedReports += 1)
    );
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/report").then((response) => {
      setReportsList(response.data);
    });
  }, []);

  const updateStatus = async (id) => {
    Axios.put(`http://localhost:3001/report/update/${id}`, {
      statusUpdate: statusUpdate,
    });
    await window.location.reload(false);
  };

  return (
    <header className="App-header">
      <CModal show={danger} onClose={() => setDanger(!danger)} color="danger">
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you really want to delete this report?</CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              setDanger(!danger);
              window.location.reload(false);
            }}
          >
            Delete
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => {
              setDanger(!danger);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>Reports</CCardHeader>
            <CCardBody>
              <CDataTable
                items={reportsList}
                fields={fields}
                itemsPerPage={5}
                pagination
                clickableRows
                scopedSlots={{
                  Delete_report: (item, index) => {
                    return (
                      <CButton
                        color="danger"
                        onClick={() => {
                          setDanger(!danger);
                          deleteReport(item._id);
                        }}
                        className="mr-1"
                      >
                        Delete
                      </CButton>
                    );
                  },
                  status: (item) => (
                    <td
                      onClick={() => {
                        setStatusUpdate(
                          item.status === "fixed" ? "Not_fixed" : "fixed"
                        );
                        updateStatus(item._id);
                      }}
                    >
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>Solvability</CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={[
                  {
                    backgroundColor: ["#41B883", "#E46651"],
                    data: [solvedReports, unSolvedReports],
                  },
                ]}
                labels={["Fixed", "Not Fixed"]}
                options={{
                  tooltips: {
                    enabled: true,
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </header>
  );
}

export default Reports;