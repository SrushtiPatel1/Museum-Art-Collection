import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate'; 

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const token = readToken(); 

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const searchField = e.target.searchField.value;
    const queryString = `title=true&q=${searchField}`;
    await addToHistory(queryString);
    setSearchHistory(current => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  const logout = () => { 
    setIsExpanded(false); 
    removeToken(); 
    router.push('/login'); 
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary justify-content-between" expand="lg" expanded={isExpanded} onToggle={handleToggle}>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand style={{ marginLeft: '5px', fontSize: '24px', fontFamily: 'cursive' }}>Srushti Artworks Explorer</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link onClick={handleClose} active={router.pathname === "/"} style={{ fontSize: '18px' }}>Home</Nav.Link>
            </Link>
            {token && (
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={handleClose} active={router.pathname === "/search"} style={{ fontSize: '18px' }}>Advanced Search</Nav.Link>
              </Link>
            )}
          </Nav>
          {token && ( 
            <>
              <Form onSubmit={handleSearchSubmit} className="d-flex" inline>
                <FormControl
                  name="searchField"
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  style={{ fontSize: '18px' }}
                />
                <Button type="submit" variant="outline-light" style={{ fontSize: '18px' }}>Search</Button>
              </Form>
              <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/favourites"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/history"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            </>
          )}
          {!token && (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link onClick={handleClose} active={router.pathname === "/register"} style={{ fontSize: '18px'}}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link onClick={handleClose} active={router.pathname === "/login"} style={{ fontSize: '18px'}}>Login</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}
