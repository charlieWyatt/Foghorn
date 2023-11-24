import React, { useState } from "react";
import "./index.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { trpc } from "../../trpc";

export const LoginBox: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [isSignUp, setIsSignUp] = useState(false);

	const loginMutation = trpc.user.login.useMutation();
	const signUpMutation = trpc.user.signUp.useMutation();

	const toggleSignUp = () => {
		setIsSignUp(!isSignUp);
	};

	const saveJWT = (token: string) => {
		localStorage.setItem("token", token);
		navigate("/");
	};

	const signUp = async (values: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		username: string;
	}) => {
		console.log("Received values of form: ", values);
		const response = await signUpMutation.mutateAsync({
			email: values.email,
			password: values.password,
			firstName: values.firstName,
			lastName: values.lastName,
			username: values.username,
		});

		if (response.token) {
			saveJWT(response.token);
		} else {
			console.log("Had an error logging you in..."); // put in error for username already signed up and then also just random other
		}
	};

	const handleLogin = async (values: { email: string; password: string }) => {
		console.log("Received values of form: ", values);
		const response = await loginMutation.mutateAsync({
			email: values.email,
			password: values.password,
		});

		if (response.token) {
			saveJWT(response.token);
		} else {
			// Display an error message for the password field
			form.setFields([
				{
					name: "password",
					errors: ["Incorrect password. Please try again."],
				},
			]);
		}
	};

	return (
		<div className="login-container">
			<Form
				name={isSignUp ? "normal_signup" : "normal_login"}
				className="login-form"
				initialValues={{
					remember: true,
				}}
				form={form}
				onFinish={isSignUp ? signUp : handleLogin}
			>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}
				>
					<Input
						prefix={<MailOutlined className="site-form-item-icon" />}
						placeholder="Email"
					/>
				</Form.Item>
				{isSignUp && (
					<>
						<Form.Item
							name="firstName"
							rules={[
								{
									required: true,
									message: "Please enter your first name!",
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="First Name"
							/>
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[
								{
									required: true,
									message: "Please enter your last name!",
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Last Name"
							/>
						</Form.Item>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "Please enter your username!",
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Username"
							/>
						</Form.Item>
					</>
				)}
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Password"
					/>
				</Form.Item>
				{isSignUp && (
					<>
						<Form.Item
							name="confirmPassword"
							dependencies={["password"]}
							rules={[
								{
									required: true,
									message: "Please confirm your Password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The two passwords do not match.")
										);
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder="Confirm Password"
							/>
						</Form.Item>
					</>
				)}
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<a className="login-form-forgot" href="">
						Forgot password
					</a>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						{isSignUp ? "Sign Up" : "Log in"}
					</Button>
					<span>
						{isSignUp ? "Already have an account? " : "Don't have an account? "}
						<a onClick={toggleSignUp} href="#">
							{isSignUp ? "Log in" : "Sign Up"}
						</a>
					</span>
				</Form.Item>
			</Form>
		</div>
	);
};
