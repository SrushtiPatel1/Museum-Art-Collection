import React from "react";
import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props){

    return(
        <>
        <MainNav />
        <div style={{ 
            backgroundImage: 'url("https://www.adirectory.us/pix/art-museums-400.jpg")', 
            backgroundSize: 'cover', 
            minHeight: '100vh',
            }}>
            <Container>
                {props.children}
            </Container>
        </div>
        </>
    )
}
