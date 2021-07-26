import Link from 'next/link';
import api from '../services/api';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MemeCard from '../components/MemeCard';
import { Action, ActionCreator } from 'redux';
import { getMemes } from '../redux/meme/selectors';
import { updateMemeData, setSelectedMeme } from '../redux/meme/action';
import { Container, Col, Row, Button } from 'react-bootstrap';

interface ReduxProps {
  memes: Array<Meme>;
}

interface MemeDataFunc {
  (): ActionCreator<Action>;
}

interface ComponentProps extends ReduxProps {
  updateMemeData: MemeDataFunc;
}

const mapStateToProps = (state): ReduxProps => ({
  memes: getMemes(state)
});

const Home = ({ updateMemeData, memes }: ComponentProps): Node => {
  const router = useRouter();
  useEffect(() => {
    updateMemeData();
  }, []);
  
  const logout = async (): Promise<void> => {
    await api.get('/api/auth/logout');
    router.push('/login');
  }

  const renderMemes = (): Array<Node> => {
    if (memes) {
      return memes.map((meme, i) => {
          
          return (
              <div key={meme.id}>
                <MemeCard name={meme.name} id={meme.id} index={i} />
              </div>
          )
      });
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-center'>Welcome to Meme-A-Gram</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={11}></Col>
        <Col xs={1}>
          <Link href='/create'>
            <Button variant='success'>Create</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {renderMemes()}
      </Row>
    </Container>
  )
}

export default connect(mapStateToProps, { updateMemeData })(Home);