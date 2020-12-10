// Util to check if username is available
import isUsernameAvailable from '../../utils/users/isUsernameAvailable';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const validate = async (values) => {
  return sleep(100).then(async () => {
    let usernameAvailable =
      values.username && (await isUsernameAvailable(values.username));
    const errors = {};
    if (!values.name) {
      errors.name = 'Please enter your name';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'That email address does not look right...';
    }
    if (!values.email || values.email === '') {
      errors.email = 'Please enter your email';
    }
    if (!values.username || values.username === '') {
      errors.username = 'Please choose a username';
    } else {
      if (!usernameAvailable) {
        errors.username =
          'Sadly someone already has that username, please pick another one';
      }
    }
    return errors;
  });
};

export default validate;
