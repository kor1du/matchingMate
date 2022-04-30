import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './notice.module.css';
const Notice = () => {
  return (
    <div className={styles.container}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>알림 제목</th>
            <th>알림 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Notice;