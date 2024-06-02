import { useState } from "react";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", currentPage, user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments/${user?.email}`, {
        params: {
          page: currentPage,
        },
      });
      return res.data;
    },
  });

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
      <Table
        dataSource={payments}
        columns={columns}
        rowKey={(record) => record.transactionId}
        pagination={{ pageSize: 5, onChange: setCurrentPage }}
      />
    </div>
  );
};

export default PaymentHistory;
