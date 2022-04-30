import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/login/login.css";

function LoginComponent() {
  return (
    <div className="login-component">
      <Card>
        <Card.Header as="h5">로그인</Card.Header>
        <Card.Body>
          <span className="card-text">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="ID" />
                <Form.Text className="text-muted">
                  <p>운동메이트는 절대로 개인정보를 공유하지 않습니다.</p>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="login-btns">
                <Button variant="primary" type="submit" className="login-btn">
                  <p>로그인</p>
                </Button>
                <Button variant="primary" className="signup-btn">
                  <Link to="/signup">
                    <p>회원가입</p>
                  </Link>
                </Button>
              </div>
            </Form>
          </span>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginComponent;
