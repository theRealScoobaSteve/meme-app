import Link from 'next/link';
import React, { useState } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import api from '../services/api';
import { useRouter } from 'next/router';

const Create = (): Node => {
  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const router = useRouter();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const data: FormData = new FormData();

    data.append('meme', file);
    data.append('name', name);

    await api.post('/api/meme', data);
    setName("");
    setFile(null);
    router.push('/');
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-center'>Create A Meme-A-Gram</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={11}></Col>
        <Col xs={1}><Button variant='success'>Create</Button></Col>
      </Row>
      <Row className='justify-content-center'>
        <form onSubmit={onSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    type='text' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder='Insert meme name here'
                />
            </Form.Group>
            <Form.Group controlId="file">
                <Form.Control 
                    className='button'
                    type='file' 
                    name='meme'
                    onChange={(e) => setFile(e.target.files[0])} 
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Save
            </Button>
            <Link href='/'>
                <Button variant='danger'>
                    Cancel
                </Button>
            </Link>
        </form>
      </Row>
    </Container>
  )
}

export default Create;