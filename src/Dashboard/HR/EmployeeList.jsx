import { useEffect, useState } from "react";
import { Table, Button, Modal, DatePicker, message } from "antd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PaymentForm from "./PaymentForm"; // Adjust the path as necessary
import moment from "moment";
import CommonTable from "../../Components/CommonTable";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const { MonthPicker } = DatePicker;

const EmployeeList = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentMonth, setPaymentMonth] = useState(null);
  const [paymentYear, setPaymentYear] = useState(null);

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
    setPayModalVisible(true);
  };

  const handleModalClose = () => {
    setPayModalVisible(false);
    setSelectedEmployee(null);
    setPaymentMonth(null);
    setPaymentYear(null);
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
      {/* <Table dataSource={employees} columns={columns} rowKey="email" /> */}
      <CommonTable data={employees} columns={columns} />
      <Modal
        title={`Pay Salary to ${selectedEmployee?.name}`}
        open={payModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <p>Salary Amount: {selectedEmployee?.salary}</p>
        <p>Bank Account: {selectedEmployee?.bank_account_no}</p>
        <MonthPicker
          placeholder="Select Month"
          value={paymentMonth}
          onChange={(date) => setPaymentMonth(date)}
          style={{ width: "100%", marginBottom: 16 }}
        />
        <DatePicker
          placeholder="Select Year"
          value={paymentYear}
          onChange={(date) => setPaymentYear(date)}
          picker="year"
          style={{ width: "100%", marginBottom: 16 }}
        />
        <Elements stripe={stripePromise}>
          <PaymentForm 
            salary={selectedEmployee?.salary} 
            selectedEmployee={selectedEmployee}
            paymentMonth={paymentMonth}
            paymentYear={paymentYear}
            handleModalClose={handleModalClose}
          />
        </Elements>
      </Modal>
    </div>
  );
};

export default EmployeeList;
