import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const { Title } = Typography;

const EmployeeDetails = () => {
  const { email } = useParams(); // Assuming you pass the employee ID in the URL
  const axiosPublic = useAxiosPublic();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axiosPublic.get(`/users/${email}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [axiosPublic, email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const data = [
    // Your salary data fetched from the database
    { month: "January", year: 2023, salary: 5000 },
    { month: "February", year: 2023, salary: 6000 },
    { month: "March", year: 2023, salary: 5500 },
    // Add more data as needed
  ];

  return (
    <div>
      <Title level={2}>{employee.name}'s Details</Title>
      <div>
        <img src={employee.photoURL} alt="Employee Photo" style={{ width: 200, height: 200, borderRadius: "50%" }} />
        <p>Designation: {employee.designation}</p>
      </div>
      <div style={{ marginTop: 20 }}>
        <BarChart
          width={800}
          height={400}
          data={data}
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
