import { ContactForm } from 'components/ContactForm/ContactForm';
import { Helmet } from 'react-helmet';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: 'var (--primary-text-color)',

    paddingLeft: 10,
  },
  h1: {
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 20,
  },
  h2: {
    marginTop: 20,
    marginBottom: 20,
  },
};

export const Contacts = () => {
  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <div style={styles.container}>
        <h1 style={styles.h1}>Phonebook</h1>
        <ContactForm />
        <h2 style={styles.h2}>Contacts</h2>
      </div>
    </>
  );
};
