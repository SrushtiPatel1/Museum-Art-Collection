import { Card, Row, Col, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useEffect, useState } from 'react'; 
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  };

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  const [showAdded, setShowAdded] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const favouritesClicked = async () => {
    try {
      if (showAdded) {
       setFavouritesList( await removeFromFavourites(objectID));
      } else {
       setFavouritesList (await addToFavourites(objectID));
      }
      setShowAdded(!showAdded);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList, objectID]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    artistDisplayName,
    creditLine,
    dimensions,
    medium,
    artistWikidata_URL,
  } = data;

 

  return (
    <Row>
      <Col md={6} className="d-flex justify-content-center align-items-center">
        <Card>
          {primaryImage && <Card.Img variant="top" src={primaryImage} style={{ width: '30rem' }} />}
        </Card>
      </Col>
      <Col md={6}>
        <>
          <br />
          <br />
        </>
        <Card>
          <Card.Body>
            <Card.Text>
              <h5>Artwork Information</h5>
              Medium: {medium || 'N/A'} <br />
              <br />
              Artist: {artistDisplayName || 'N/A'}{' '}
              {artistDisplayName && artistWikidata_URL && (
                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                  wiki
                </a>
              )}
              <br />
              Credit Line: {creditLine || 'N/A'} <br />
              Dimensions: {dimensions || 'N/A'}
            </Card.Text>
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
