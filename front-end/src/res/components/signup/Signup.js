import { Card, Form, Button } from "react-bootstrap";
import React from "react";
import "../../css/signup/signup.css";

export default function Signup() {
  return (
    <div className="container signup-component">
      <Card>
        <Card.Header>
          <p className="header-title">회원가입</p>
          <p>운동메이트에 오신것을 환영합니다!</p>
        </Card.Header>
        <Card.Body>
          <div className="card-text">
            <Form>
              <div className="signup-separate">
                <div className="signup-part1">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="ID" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>주소</p>
                    </Form.Label>
                    <Form.Control type="text" placeholder="주소" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>생일</p>
                    </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </div>
                <div className="signup-part2">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>이름</p>
                    </Form.Label>
                    <Form.Control type="text" placeholder="이름" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>별명</p>
                    </Form.Label>
                    <Form.Control type="text" placeholder="별명" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>전화번호</p>
                    </Form.Label>
                    <Form.Control type="text" placeholder="전화번호" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>성별</p>
                    </Form.Label>
                    <Form.Check type="radio" name="gender" label="남성" />
                    <Form.Check type="radio" name="gender" label="여성" />
                  </Form.Group>{" "}
                </div>
              </div>
              <div className="signup-btn">
                <Button type="submit" variant="primary">
                  Signup
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
