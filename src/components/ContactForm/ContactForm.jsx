import { FormStyled, Label, Input, Error, Button } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { Notify } from 'notiflix';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Invalid name'
    ),
  number: Yup.string()
    .length(9)
    .required('Phone number is required')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d/,
      'Invalid number'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newName = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (newName) {
      Notify.failure(`${values.name} is already in contacts`);
      return;
    }
    dispatch(addContact({ name: values.name, number: values.number }));
    resetForm();
    Notify.success(`${values.name} is added to contacts`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormStyled autoComplete="off">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" placeholder="Jacob Mercer" />
        <ErrorMessage component={Error} name="name" />

        <Label htmlFor="number">Number</Label>
        <Input type="tel" name="number" placeholder="787-78-78" maxLength="9" />
        <ErrorMessage component={Error} name="number" />
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};
