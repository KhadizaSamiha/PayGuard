import { useEffect, useState } from "react";
import { supabase } from "@/config";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // To store the filtered user data from MongoDB

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        await fetchUserData(user.email);  // Fetch additional user data from MongoDB using email
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${email}`); // Backend endpoint to fetch user data by email
      setUserData(response.data); // Store the MongoDB user data in state
    } catch (error) {
      console.error("Failed to fetch user data from MongoDB:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, userData, loading };
};
