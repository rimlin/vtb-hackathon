import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';

import { login } from 'services/api';
import { useState } from 'react';
import { getJson, setJson } from 'utils/helpers/localStorage';
import { useContext } from 'react';
import { UserSetContext } from 'utils/contexts/user.context';

interface FormData {
  login: string;
  password: string;
}

const initialValues: FormData = {
  login: '',
  password: '',
};

export const RegisterPage = () => {
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
      return login(values)
        .then(result => {
          setJson('clientId', { value: result.partnerId });
          setJson('token', { value: result.token });
          setValue({ isAuthenticated: true, isLoaded: true });
          history.push('/channels');
        })
        .catch(() => {
          setError('Неправильный номер телефона или пароль');
        })
        .finally(() => setLoading(false));
    },
  });

  const { values, setFieldValue, handleSubmit } = formikbag;

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" gutterBottom>
              Войти
            </Typography>

            <TextField
              label="Номер телефона"
              required
              size="medium"
              value={values.login}
              variant="outlined"
              onChange={event => setFieldValue('login', event.target.value)}
            />
            <TextField
              label="Пароль"
              required
              size="medium"
              type="password"
              value={values.password}
              variant="outlined"
              onChange={event => setFieldValue('password', event.target.value)}
            />

            {error && (
              <Typography variant="body2" color="error" gutterBottom>
                {error}
              </Typography>
            )}

            <div>
              <Button type="submit" disabled={loading} size="medium" variant="contained">
                Войти
              </Button>
            </div>
          </form>
          <div>
            <Typography variant="h3" color="secondary" gutterBottom>
              Еще не зарегистрированы?
            </Typography>
            <Link to="/register">
              <Button size="medium" variant="contained">
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
