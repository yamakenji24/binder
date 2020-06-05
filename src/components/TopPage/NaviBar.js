import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logout from '../User/logout';

export default function NaviBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/toppage">Binder</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/toppage">TopPage</Nav.Link>
      </Nav>
      <Nav className="mr-right">
        <Nav.Link href="/toppage/postDoc">投稿する</Nav.Link>
        <Nav.Link href="/toppage/mypage">MyPage</Nav.Link>
        <Logout />
      </Nav>
    </Navbar>
  )
}
