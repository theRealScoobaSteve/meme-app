import api from '../services/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { Action, ActionCreator } from 'redux';
import Container from 'react-bootstrap/Container';
import { updateToken } from '../redux/auth/action';
import { Form as BootStrapForm }  from 'react-bootstrap';

interface UpdateFunc {
  (token: string): ActionCreator<Action>;
}

interface ComponentProps {
  updateToken: UpdateFunc;
}

export interface LoginData {
  email: string;
  password: string;
}

const Login = ({ updateToken }: ComponentProps): Node => {
  const router = useRouter();

  const login = async ({ email, password }: LoginData, { setSubmitting }: any) => {
      const { data: { user, accessToken } } = await api.post("/api/auth/login", {
        email,
        password,
      });
      
      if (user) {
        updateToken(accessToken);
        router.push('/');
      }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className='text-center'>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={login}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field 
                    type="email" 
                    name="email" 
                    render={({field, formProps}) => (
                    <BootStrapForm.Group controlId="email">
                        <BootStrapForm.Label>Email</BootStrapForm.Label>
                        <BootStrapForm.Control type='text' value={field.value} onChange={field.onChange} />
                    </BootStrapForm.Group>
                  )}
                  />
                  <Field 
                    type="password" 
                    name="password" 
                    render={({field, formProps}) => (
                    <BootStrapForm.Group controlId="password">
                        <BootStrapForm.Label>Password</BootStrapForm.Label>
                        <BootStrapForm.Control type='password' value={field.value} onChange={field.onChange} />
                    </BootStrapForm.Group>
                  )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => router.push('/register')}>
              Create Account
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default connect(null, { updateToken })(Login);