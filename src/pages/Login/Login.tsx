import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

import { login } from 'services/api';
import { useState } from 'react';
import { getJson, setJson } from 'utils/helpers/localStorage';
import { useContext } from 'react';
import { UserSetContext } from 'utils/contexts/user.context';
import { TextField } from 'components/TextField';

import styles from './Login.module.css';

interface FormData {
  login: string;
  password: string;
}

const initialValues: FormData = {
  login: '',
  password: '',
};

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { setValue } = useContext(UserSetContext);

  const formikbag = useFormik<FormData>({
    initialValues,
    validateOnMount: true,
    validate: (values: any) => {
      return {};
    },
    onSubmit: values => {
      setLoading(true);
      setError('');
      setJson('token', { value: 'temp' });
      setValue({ isAuthenticated: true, isLoaded: true });
      history.push('/home');

      //   return login(values)
      //     .then(result => {
      //       setJson('clientId', { value: result.partnerId });
      //       setJson('token', { value: result.token });
      //       setValue({ isAuthenticated: true, isLoaded: true });
      //       history.push('/channels');
      //     })
      //     .catch(() => {
      //       setError('Неправильный номер телефона или пароль');
      //     })
      //     .finally(() => setLoading(false));
    },
  });

  const { values, setFieldValue, handleSubmit } = formikbag;

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Typography className={styles.title} variant="h2">
          Авторизация
        </Typography>

        <TextField
          placeholder="E-mail"
          required
          size="medium"
          value={values.login}
          onChange={event => setFieldValue('login', event.target.value)}
          fullWidth
          className={styles.field}
        />
        <TextField
          placeholder="Пароль"
          required
          size="medium"
          type="password"
          value={values.password}
          onChange={event => setFieldValue('password', event.target.value)}
          fullWidth
          className={styles.field}
        />

        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <Button
          className={styles.action}
          fullWidth
          type="submit"
          disabled={loading}
          size="large"
          variant="contained"
        >
          Войти
        </Button>

        <Typography variant="body1" className={styles.or}>
          или
        </Typography>

        <Button
          component={Link}
          to="/register"
          size="large"
          color="secondary"
          variant="contained"
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
};
