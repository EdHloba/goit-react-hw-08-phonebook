import { Form, Label } from "./LoginForm.styled";

export const LoginForm = () => {
  return (
    <Form  autoComplete="off">
      <Label>
        Email
        <input type="email" name="email" />
      </Label>
      <Label>
        Password
        <input type="password" name="password" />
      </Label>
      <button type="submit">Log In</button>
    </Form>
  );
};
