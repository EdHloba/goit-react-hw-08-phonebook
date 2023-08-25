import { UserName, Wrapper } from './UserMenu.styled';

export const UserMenu = () => {
  return (
    <Wrapper>
      <UserName>Welcome</UserName>
      <button type="button">Logout</button>
    </Wrapper>
  );
};
