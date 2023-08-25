import { Navigation } from 'components/Navigation/Navigation';
import { Header } from './AppBar.styled';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { AuthNav } from 'components/AuthNav/AuthNav';

export const AppBar = () => {
  return (
    <Header>
      <Navigation />
      <UserMenu />
      <AuthNav />
    </Header>
  );
};
