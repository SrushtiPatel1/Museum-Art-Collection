import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites() {

  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null; 

  return (
    <>
    <br/>
    <br/>
    <Container>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
               Try Adding Some of Your favourite Art
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

    </Container>

    </>
  );
}
