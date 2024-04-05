/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Srushti Patel Student ID: 117791228  Date: 23/03/2024
*
********************************************************************************/ 



import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <br />
      <br />

      <Container>
      <h1 style={{ color: 'black' }}>Welcome to Metropolitan Museum of Art</h1>

        <Row>
          <Col md={6}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
              fluid
              rounded
              alt="Metropolitan Museum of Art"
            />
          </Col>
          <Col md={6}>
            <div style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', borderRadius: '5px' }}>
              <p>
                The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the United States. With 6,479,548 visitors to its three locations in 2019, it was the fourth most visited art museum in the world. Its permanent collection contains over two million works, divided among seventeen curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park in Manhattan Upper East Side, is by area one of the world largest art galleries.
              </p>
              <p>
                <a
                  href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  Learn more about Metropolitan Museum of Art on Wikipedia
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
