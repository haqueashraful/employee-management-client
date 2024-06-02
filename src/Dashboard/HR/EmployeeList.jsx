import { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const EmployeeList = () => {
  const axiosPublic = useAxiosPublic();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMonth, setPaymentMonth] = useState("");
  const [paymentYear, setPaymentYear] = useState("");

  const handleToggleVerified = async (record) => {
    try {
      // Assuming you have an API endpoint for toggling the verified status
      const res = await axiosPublic.patch(`/users/verify/${record.email}`);
      message.success(res.data.message);
    } catch (error) {
      console.error("Failed to toggle verified status", error);
      message.error("Failed to toggle verified status");
    }
  };

  const handlePay = (record) => {
    console.log(record);
    setSelectedEmployee(record);
    setPayModalVisible(true);
  };

  const handlePayConfirm = async () => {
    try {
      // Assuming you have an API endpoint for paying the salary
      const res = await axiosPublic.post("/pay-salary", {
        email: selectedEmployee.email,
        amount: paymentAmount,
        month: paymentMonth,
        year: paymentYear,
      });
      message.success(res.data.message);
      setPayModalVisible(false);
    } catch (error) {
      console.error("Failed to pay salary", error);
      message.error("Failed to pay salary");
    }
  };


  const {data : employees =[], isLoading } = useQuery({
    queryKey: ["employees", handleToggleVerified],
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
          <Button
            onClick={() => handleToggleVerified(record)}
          >
            {verified ? "✅" : "❌"}
          </Button>
        ),
      },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
      key: "bankAccount",
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
        <Button onClick={() => console.log("View details", record)}>Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">Employee List</h1>
      <Table dataSource={employees} columns={columns} />
      <Modal
        title={`Pay Salary to ${selectedEmployee?.name}`}
        visible={payModalVisible}
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
