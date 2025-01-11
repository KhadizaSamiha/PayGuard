import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/features/auth/authService";
import { showToast } from "@/utils/toastUtils";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.email || !form.password) {
        showToast("Please fill all the fields", "error");
        return;
      }
      await login(form.email, form.password);
      navigate("/home");
      showToast("Login Success");
    } catch (error) {
      showToast("Login Failed", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Login
          </h2>
          <p className="text-center text-gray-600">
            Enter your email and password to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmitHandler} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              onChange={onChangeHandler}
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
        <div className="mt-6 space-y-2">
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 hover:text-blue-800"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
