import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchBy, setSearchBy] = useState('Title');
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => { 
    let queryString = `searchBy=${searchBy}`;

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&q=${data.q}`;

    await addToHistory(queryString); 
    setSearchHistory(current => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1>Advanced Search</h1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="formSearchBy">
          <Form.Label>Search By</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-search-by">
              {searchBy}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSearchBy('Title')}>Title</Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBy('Tags')}>Tags</Dropdown.Item>
              <Dropdown.Item onClick={() => setSearchBy('Artist or Culture')}>Artist or Culture</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <br />
        <Form.Group controlId="formGeoLocation">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control type="text" placeholder="Enter Geo Location (Europe|France|Paris|China|New York) - Case Sensitive" {...register("geoLocation")} />
          <Form.Text className="text-muted">
            Case sensitive string with multiple values separated by the &quot;|&quot; operator.
          </Form.Text>
        </Form.Group>
        <br />
    
        <Form.Group controlId="formMedium">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" placeholder="Enter Medium (Ceramics|Furniture|Paintings|Sculpture|Textiles) - Case Sensitive" {...register("medium")} />
          <Form.Text className="text-muted">
            Case sensitive string with multiple values separated by the &quot;|&quot; operator.
          </Form.Text>
        </Form.Group>
        <br />
       
        <Form.Group controlId="formIsOnView">
          <Form.Check type="checkbox" label="Is On View" {...register("isOnView")} />
        </Form.Group>

        <Form.Group controlId="formIsHighlight">
          <Form.Check type="checkbox" label="Is Highlight" {...register("isHighlight")} />
        </Form.Group>
        <br />
        <Form.Group controlId="formQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control type="text" placeholder="Enter Query" {...register("q", { required: true })} isInvalid={!!errors.q} />
          {errors.q && <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>}
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
