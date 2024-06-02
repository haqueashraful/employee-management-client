import { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMonth, setPaymentMonth] = useState("");
  const [paymentYear, setPaymentYear] = useState("");

  const handleToggleVerified = async (record) => {
    try {
      const res = await axiosPublic.patch(`/users/verify/${record.email}`);
      message.success(res.data.message);
    } catch (error) {
      console.error("Failed to toggle verified status", error);
      message.error("Failed to toggle verified status");
    }
  };

  const handlePay = (record) => {
    setSelectedEmployee(record);
    setPaymentAmount(record.salary); // Assuming you want to set the salary amount
    setPayModalVisible(true);
  };

  const handlePayConfirm = async () => {
    try {
      const res = await axiosPublic.post("/pay-salary", {
        email: selectedEmployee.email,
        amount: paymentAmount,
        month: paymentMonth,
        year: paymentYear,
      });
      message.success(res.data.message);
      setPayModalVisible(false);
      setPaymentAmount("");
      setPaymentMonth("");
      setPaymentYear("");
    } catch (error) {
      console.error("Failed to pay salary", error);
      message.error("Failed to pay salary");
    }
  };

  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    }
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (verified, record) => (
        verified ? "✅" : (
          <Button onClick={() => handleToggleVerified(record)}>
            ❌
          </Button>
        )
      ),
    },
    {
      title: "Bank Account",
      dataIndex: "bank_account_no",
      key: "bank_account_no",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Pay",
      key: "pay",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handlePay(record)}
          disabled={!record.isVerified}
        >
          Pay
        </Button>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Button onClick={() => navigate(`/dashboard/employee/${record.email}`)}>Details</Button>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading employees</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">Employee List</h1>
      <Table dataSource={employees} columns={columns} rowKey="email" />
      <Modal
        title={`Pay Salary to ${selectedEmployee?.name}`}
        open={payModalVisible}
        onOk={handlePayConfirm}
        onCancel={() => setPayModalVisible(false)}
      >
        <p>Salary Amount: {selectedEmployee?.salary}</p>
        <Input
          placeholder="Month"
          value={paymentMonth}
          onChange={(e) => setPaymentMonth(e.target.value)}
        />
        <Input
          placeholder="Year"
          value={paymentYear}
          onChange={(e) => setPaymentYear(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
