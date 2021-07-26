import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Action, ActionCreator } from 'redux';
import { setSelectedMeme } from '../redux/meme/action';

interface SelectedFunc {
    (id: number): ActionCreator<Action>;
}

interface ComponentProps {
    id: string,
    name: string,
    setSelectedMeme: SelectedFunc,
    index: number;
}

const MemeCard = ({ id, name, setSelectedMeme, index }): Node => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={`/api/meme/image/${id}`} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Link href='/meme'>
                    <Button variant='primary' onClick={() => setSelectedMeme(index)}>See Meme</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default connect(null, { setSelectedMeme })(MemeCard);