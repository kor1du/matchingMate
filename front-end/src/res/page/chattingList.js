import React from "react";
import { Container } from "react-bootstrap";
import ChattingListComponent from "../components/chattingList/ChattingList";
import Nav from "../components/Nav/Nav";

export default function ChattingList() {
  return (
    <Container>
      <Nav></Nav>
      <ChattingListComponent></ChattingListComponent>
    </Container>
  );
}
