import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import MyPaymentsTable from "./MyPaymentsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 
const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); 
  const [filteredPayments, setFilteredPayments] = useState([]); 
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      fetch(`https://payguard-server-production.up.railway.app/payments/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPayments(data);
          setFilteredPayments(data); 
        })
        .catch((error) => console.error("Error fetching payments:", error));
    }
  }, [user]);

  useEffect(() => {
    // Filter payments based on selected status
    if (filterStatus) {
      setFilteredPayments(
        payments.filter((payment) => payment.status === filterStatus)
      );
    } else {
      setFilteredPayments(payments); 
    }
  }, [filterStatus, payments]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold mb-5 text-gray-700">My Payments</h1>

        {/* Filter by status */}
        <div className="mb-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter By Status" />
            </SelectTrigger>
            <SelectContent>
              <div className="space-y-2">
                <SelectItem value={null}>All</SelectItem> 
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <MyPaymentsTable payments={filteredPayments} />
    </div>
  );
};

export default MyPayments;