import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { AddLoader } from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';
import { toast } from 'react-hot-toast';
import { Grid, TextField } from '@mui/material';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const EditModal = ({ isOpen, id, name, number, onClose }) => {
  const [contactName, setContactName] = React.useState(name);
  const [contactNumber, setContactNumber] = React.useState(number);
  const dispatch = useDispatch();
  const operation = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);

  const handleEdit = async e => {
    e.preventDefault();

    const EditName = contacts.some(
      contact => contact.name.toLowerCase() === contactName.toLowerCase()
    );
    const EditNumber = contacts.some(
      contact => contact.number === contactNumber
    );

    if (EditName && EditNumber) {
      toast.error(`${contactName} is already in contacts`);
      return;
    }

    if (contactName === '' || contactNumber === '') {
      toast.error('Fields cannot be empty. Enter some data!');
      return;
    }

    try {
      await dispatch(
        updateContact({
          name: contactName,
          number: contactNumber,
          contactId: id,
        })
      ).unwrap();
      toast.success(`${name} contact was changed`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Oooops!..Something went wrong:( Please try later');
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: { xs: 240, sm: 400 } }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleEdit}
          >
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={contactName}
              onChange={({ target: { value } }) => setContactName(value)}
            />

            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              type="tel"
              id="number"
              label="Phone Number"
              name="number"
              value={contactNumber}
              onChange={({ target: { value } }) => setContactNumber(value)}
            />

            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, mr: 2 }}
              >
                {operation === 'update' ? <AddLoader /> : <>Save</>}
              </Button>
              <Button
                type="button"
                size="medium"
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
