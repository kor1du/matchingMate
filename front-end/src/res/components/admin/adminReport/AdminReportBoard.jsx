import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Pagination from "../../pagination/Pagination";
import { axiosPost } from "../../axios/Axios";
import "../../../css/adminComponents/adminReportBoard.css";

export default function AdminReportBoard({ reports }) {
  function ReportBoard({ report }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function sendAccept(report) {
      const data = { id: report.id, result: "승인" };
      console.log(data);
      axiosPost("/admin/report/dispose", data).then((res) => {
        console.log(res);
      });
    }

    function sendDecline(report) {
      const data = { id: report.id, result: "거절" };
      console.log(data);
      axiosPost("/admin/report/dispose", data).then((res) => {
        console.log(res);
      });
    }
    return (
      <>
        <a onClick={handleShow}>
          <Row className="admin-reports-head">
            <Col xs="1">
              <p>{report.id}</p>
            </Col>
            <Col xs="3">
              <p>{report.reportClassify}</p>
            </Col>
            <Col xs="4">
              <p>{report.reportType}</p>
            </Col>
            <Col xs="4">
              <p>{report.status}</p>
            </Col>
          </Row>
        </a>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>신고 상세보기</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-report">신고종류 : {report.reportClassify}</p>
            <p className="modal-report">카테고리 : {report.reportType}</p>
            <p className="modal-report">신고내용 : {report.contents}</p>
            <p className="modal-report">신고자 : {report.memberId}</p>
            <p className="modal-report">피신고자 : {report.targetMemberId}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              <p>내용보기</p>
            </Button>
            <Button variant="success" onClick={() => sendAccept(report)}>
              <p>승인</p>
            </Button>
            <Button variant="danger" onClick={() => sendDecline(report)}>
              <p>거절</p>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    console.log({ reports });
  });

  return (
    <>
      <div className="admin-reports">
        <Row className="admin-reports-head">
          <Col xs="1">
            <p>No</p>
          </Col>
          <Col xs="3">
            <p>신고종류</p>
          </Col>
          <Col xs="4">
            <p>카테고리</p>
          </Col>
          <Col xs="4">
            <p>처리상태</p>
          </Col>
        </Row>
        <Row className="admin-reports-item"></Row>
        {reports.slice(offset, offset + limit).map((report) => {
          return <ReportBoard key={report.id} report={report} />;
        })}
      </div>
      <Pagination total={reports.length} limit={limit} page={page} setPage={setPage} />
    </>
  );
}
