import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
const { Title } = Typography;

const EmployeeDetails = () => {
  const { email } = useParams(); 
  const axiosPublic = useAxiosPublic();

  const {data: user, isPending} = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${email}`);
      return res.data;
    },
  });

  const { data: employee, error } = useQuery({
    queryKey: ["employees", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/payments/${email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading />
  }

  if (error || !employee) {
    return <div>Error fetching employee details</div>;
  }

  const salaryData = employee.map((item) => ({ month: item.month, salary: item.salary }));

  return (
    <div>
      <Title level={2}>{user?.name}&apos;s Details</Title>
      <div className="flex justify-center items-center gap-8">
       <div>
       <img src={user.photo} alt="Employee Photo" style={{ width: 200, height: 200, borderRadius: "10%" }} />
       </div>
        <div>
          <h1>Name: {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>role: {user.role}</p>
          <p>Bank Account: {user.bank_account_no}</p>
          <p>Salary: {user.salary}</p>
        <p>Designation: {user.designation}</p>
        </div>
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
