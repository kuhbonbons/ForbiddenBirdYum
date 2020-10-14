import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(15)
    .matches(/^[A-z0-9]+$/, { excludeEmptyString: true, message: "Username can't contain any special characters" })
    .required('Username is required'),
  password: Yup.string()
    .min(8)
    .max(255)
    .required('Password is required'),
});

// placeholder for now
export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(15)
    .matches(/^[A-z0-9]+$/, { excludeEmptyString: true, message: "Username can't contain any special characters" })
    .required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid E-Mail')
    .matches(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/, { message: 'Please enter a valid E-Mail' })
    .required('E-Mail is required'),
  password: Yup.string()
    .min(8)
    .max(255)
    .required('Password is required'),
});
