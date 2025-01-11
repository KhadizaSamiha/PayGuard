import { useEffect, useState } from "react";
import { supabase } from "@/config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
};
