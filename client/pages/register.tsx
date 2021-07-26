import api from '../services/api';
import { LoginData } from './login';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { Row, Col, Container, Button, Form as BootStrapForm } from 'react-bootstrap';

const Home = (): Node => {
  const router = useRouter();

  const register = async ({ email, password }: LoginData, { setSubmitting }: any) => {
      const { data: message } = await api.post("/api/auth/register", {
        email,
        password
      });
      
      if (message) {
          router.push('/login');
      }
  };

  return (
    <>
      <Container>
          <Col>
            <h1 className='text-center'>Register</h1>
          </Col>
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
              onSubmit={register}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field 
                    type="email" 
                    name="email" 
                    render={({field, formProps}) => (
                    <BootStrapForm.Group controlId="email">
                        <BootStrapForm.Label>Email</BootStrapForm.Label>
                        <BootStrapForm.Control type='email' value={field.value} onChange={field.onChange} />
                    </BootStrapForm.Group>
                  )}
                  />
                  <Field 
                    type="password" 
                    name="password" 
                    render={({field, formProps}) => (
                    <BootStrapForm.Group controlId='password'>
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
            <Button onClick={() => router.push('/login')}>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home;