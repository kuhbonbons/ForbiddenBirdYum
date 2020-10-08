import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import fetch from 'isomorphic-fetch';
import styles from './LoginForm.module.scss';
import { LoginSchema } from '../../schemas';

const { NEXT_PUBLIC_API_URL } = process.env;

const LoginForm = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={LoginSchema}
    onSubmit={async (values) => {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        window.location.replace('http://localhost:3000/');
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form className={styles.form}>
        <h3 className="form-title">Log into your account.</h3>
        <div>
          <span>Username</span>
          <ErrorMessage name="username">{ (msg) => <span className="formik-error-text">{msg}</span>}</ErrorMessage>
          <Field placeholder="Enter your username" type="text" name="username" />
        </div>
        <div>
          <span>Password</span>
          <ErrorMessage name="password">{ (msg) => <span className="formik-error-text">{msg}</span>}</ErrorMessage>
          <Field placeholder="Enter your password" type="password" name="password" />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </div>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
