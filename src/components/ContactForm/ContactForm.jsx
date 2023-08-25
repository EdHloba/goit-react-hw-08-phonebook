import { FormStyled, Label, Input, Error, Button } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    number: ''
};

export const ContactForm = () => {
        return (
             <Formik 
                initialValues={initialValues} 
                validationSchema={schema}>
                <FormStyled autoComplete="off" >
                    <Label htmlFor='name'>Name</Label>
                    <Input type="text" name="name" placeholder="Jacob Mercer" />
                    <ErrorMessage component={Error} name="name" />

                    <Label htmlFor='number'>Number</Label>
                    <Input type="tel" name="number" placeholder="787-78-78" maxLength="9" />
                    <ErrorMessage component={Error} name="number"/>
                    <Button type="submit">Add contact</Button>
                </FormStyled>
            </Formik>
        );
};