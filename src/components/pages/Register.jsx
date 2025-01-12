import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/features/auth/authService";
import { showToast } from "@/utils/toastUtils";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
  
    const onChangeHandler = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        if (!form.name || !form.email || !form.password) {
          showToast("Please fill all the fields", "error");
          return;
        }
        await register(form.email, form.password, form.name);
        navigate("/home");
        showToast("Registration Successfull!");
      } catch (error) {
        showToast(error.message, "error");
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Sign Up
          </h2>
          <p className="text-center text-gray-600">
            Enter your name, email and password to register to your account
          </p>
        </div>
        <form onSubmit={handleSubmitHandler} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="your name"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your email"
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
              placeholder="your password"
              onChange={onChangeHandler}
              required
            />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-500" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="mt-6 space-y-2">
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to={"/Login"} className="text-blue-700 hover:text-blue-800">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
