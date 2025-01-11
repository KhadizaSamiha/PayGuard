import { supabase } from "@/config";
import axios from "axios";

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

export const register = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw new Error(error.message);

  // Save user to MongoDB after successful registration
  const user = {
    email,
    password,
    role: 'user',
    user_id: data.user.id,
    createdAt: new Date(),
  };

  try {
    await axios.post("http://localhost:3000/users", user); // Replace with your backend URL
  } catch (error) {
    console.error("Failed to save user to MongoDB:", error);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
