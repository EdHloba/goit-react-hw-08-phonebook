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
      main: '#FF5733',
    },
  },
});

export const Bar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar component="nav">
            <Navigation sx={{ flexGrow: 1 }}/>
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
