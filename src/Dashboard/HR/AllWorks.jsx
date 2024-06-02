import { useState, useEffect } from "react";
import { Select, Table, Typography } from "antd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const { Option } = Select;
const { Title } = Typography;

const AllWorks = () => {
  const axiosPublic = useAxiosPublic();
  const [months, setMonths] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState();
  const [workRecords, setWorkRecords] = useState([]);
  const [totalWorkHours, setTotalWorkHours] = useState(0);


  const {data : employees = [], isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    }
  })    

  useEffect(() => {
    const fetchMonths = async () => {
      // Fetch months from your database or generate dynamically
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      setMonths(months);
    };

    refetch();
    fetchMonths();
  }, [axiosPublic]);

  useEffect(() => {
    const fetchWorkRecords = async () => {
      try {
        let uri = "/works?";
        if(selectedEmployee || selectedMonth) {
          uri += `employee=${selectedEmployee}&month=${selectedMonth < 10 && selectedMonth > 0 ? `0${selectedMonth}` : selectedMonth}`;
        }
        console.log(selectedMonth)
        console.log(uri)
        const response = await axiosPublic.get(uri);
        console.log(response.data)
        setWorkRecords(response.data);
        const totalHours = response.data.reduce(
          (total, record) => total + parseInt(record.hours),
          0
        );
        setTotalWorkHours(totalHours);
      } catch (error) {
        console.error("Error fetching work records:", error);
      }
    };

    fetchWorkRecords();
  }, [axiosPublic, selectedEmployee, selectedMonth]);

  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value);
  };


  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const columns = [
    { title: "Employee", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Hours Worked", dataIndex: "hours", key: "hours" },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Title level={3}>Filter by Employee:</Title>
          <Select
            defaultValue="All Employees"
            style={{ width: 200 }}
            onChange={handleEmployeeChange}
          >
            <Option value={null}>All Employees</Option>
            {employees.map((employee) => (
              <Option key={employee._id} value={employee.name}>
                {employee.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <Title level={3}>Filter by Month:</Title>
          <Select
            defaultValue="All Months"
            style={{ width: 200 }}
            onChange={handleMonthChange}
          >
            <Option value={null}>All Months</Option>
            {months.map((month, index) => (
              <Option key={index} value={index + 1}>
                {month}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <Table dataSource={workRecords} columns={columns} />
      <div>
        <Title level={3}>Total Work Hours: {totalWorkHours}</Title>
      </div>
    </div>
  );
};

export default AllWorks;
