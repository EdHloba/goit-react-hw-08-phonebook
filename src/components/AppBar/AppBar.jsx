import { useAuth } from 'hooks';
import AppBar from '@mui/material/AppBar';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider, Toolbar } from '@mui/material';
import { Navigation } from 'components/Navigation';
import { UserMenu } from 'components/UserMenu';
import { AuthNav } from 'components/AuthNav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DE4800',
    },
  },
});

export const Bar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Box >
        <AppBar position="static">
          <Toolbar component="nav">
            <Navigation/>
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
