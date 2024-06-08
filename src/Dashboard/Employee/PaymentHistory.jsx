import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CommonTable from "../../Components/CommonTable";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments/${user?.email}`, {
      });
      return res.data;
    },
  });

  const columns = [
    {
      title: "Sl.No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "salary($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">Payment History</h1>
      <CommonTable data={payments} columns={columns} />
    
    </div>
  );
};

export default PaymentHistory;
