import React from 'react';
import Link from 'next/link';
import FileSaver from 'file-saver';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getSelectedMeme } from '../redux/meme/selectors';

interface ComponentProps {
    meme: Meme;
}

const mapStateToProps = (state) => ({
    meme: getSelectedMeme(state)
});

const Meme = ({ meme }: ComponentProps): Node => {
    const download = async (e) => {
        e.preventDefault();
        FileSaver.saveAs(e.target.href, `${meme.name}.jpg`)
    }

    if (meme) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{meme.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={`/api/meme/image/${meme.id}`} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={10}></Col>
                    <Col xs={1}>
                        <Button  
                            href={`/api/meme/image/${meme.id}`} 
                            className='btn btn-success'
                            download
                            onClick={(e) => download(e)}
                        >
                            Download
                        </Button>
                    </Col>
                    <Col xs={1}>
                        <Link href='/'>
                            <Button variant='danger'>Back</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }

    return null;
}

export default connect(mapStateToProps, null)(Meme);