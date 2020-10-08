import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(15)
    .required('Username is required!'),
  password: Yup.string()
    .min(8)
    .max(255)
    .required('Password is required!'),
});

// placeholder for now
export const SingUpSchema = {};
