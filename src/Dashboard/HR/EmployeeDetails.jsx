import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const { Title } = Typography;

const EmployeeDetails = () => {
  const { email } = useParams(); 
  const axiosPublic = useAxiosPublic();

  const {data: user} = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${email}`);
      return res.data;
    },
  });

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ["employees", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments/${email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !employee) {
    return <div>Error fetching employee details</div>;
  }

  const salaryData = employee.map((item, index) => ({ month: item.month, salary: item.salary }));

  return (
    <div>
      <Title level={2}>{user.name}'s Details</Title>
      <div>
        <img src={user.photo} alt="Employee Photo" style={{ width: 200, height: 200, borderRadius: "50%" }} />
        <p>Designation: {user.designation}</p>
      </div>
      <div style={{ marginTop: 20 }}>
        <BarChart
          width={800}
          height={400}
          data={salaryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default EmployeeDetails;
