import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "../trpc";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const Auth: React.FC<{ isSignup: boolean }> = ({ isSignup }) => {
  const [showSignup, setShowSignup] = useState(() => isSignup);
  const navigate = useNavigate();

  const signupMutation = trpc.user.signup.useMutation();
  const loginMutation = trpc.user.login.useMutation();

  const saveJWT = (token: string) => {
    localStorage.setItem("token", token);
    navigate("/");
  };

  const onSignup = async (data: SignUpFormData) => {
    const response = await signupMutation.mutateAsync(data);

    if (response.token) {
      saveJWT(response.token);
    }
  };

  const onLogin = async (data: LoginFormData) => {
    const response = await loginMutation.mutateAsync(data);

    if (response.token) {
      saveJWT(response.token);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen auth-container bg-gray-50">
      <div className="w-3/4 sm:w-1/3 lg:w-1/4 flex flex-col rounded-md shadow-lg p-4 bg-white">
        {!showSignup ? (
          <div>
            <h1 className="text-xl font-bold my-3">Login</h1>
            <Form layout="vertical" onFinish={onLogin}>
              <Form.Item label="email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="password" name="password">
                <Input.Password />
              </Form.Item>
              <Button
                htmlType="submit"
                children={"Log In"}
                loading={loginMutation.isLoading}
              />
            </Form>

            <p className="text-sm">
              Don't have an account?&nbsp;
              <a
                className="cursor-pointer underline"
                onClick={() => setShowSignup(true)}
              >
                sign up
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold my-3">Signup</h1>
            <Form layout="vertical" onFinish={onSignup}>
              <Form.Item label="username" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="password" name="password">
                <Input.Password />
              </Form.Item>
              <Button
                children={"Sign Up"}
                htmlType="submit"
                loading={signupMutation.isLoading}
              />
            </Form>
            <p className="text-sm">
              Already have an account?&nbsp;
              <a
                className="cursor-pointer underline"
                onClick={() => setShowSignup(false)}
              >
                log in
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
