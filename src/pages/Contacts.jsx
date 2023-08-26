import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from 'redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';

import { Notify } from 'notiflix';
import { Helmet } from 'react-helmet';
import { Loader } from 'components/Loader/Loader';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';

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
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <div style={styles.container}>
        {error &&
          Notify.failure('Ooops!..Something went wrong. Try to reload page')}
        <h1 style={styles.h1}>Phonebook</h1>
        <ContactForm/>
        <h2 style={styles.h2}>Contacts</h2>
        <Filter/>
        {isLoading && !error && <Loader/>}
        <ContactList/>
      </div>
    </>
  );
};
