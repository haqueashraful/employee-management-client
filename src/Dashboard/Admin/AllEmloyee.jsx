import { useState, useEffect, Children } from 'react';
import { Table, Button, Modal, Form, InputNumber, Typography, message, Card, Row, Col, Switch } from 'antd';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import CommonTable from '../../Components/CommonTable';
import Proptype from "prop-types"

const { Title } = Typography;

const AllEmployee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState('table');
  const [form] = Form.useForm();

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  });

  const handleFire = (employee) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/users/${employee.email}`, { isFired: true });
          if (response.data.modifiedCount > 0) {
            Swal.fire(
              'Deleted!',
              'The employee has been fired.',
              'success'
            );
            refetch();
          } else {
            Swal.fire(
              'Error!',
              'Failed to fire the employee.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error firing employee:", error);
          Swal.fire(
            'Error!',
            'Failed to fire the employee.',
            'error'
          );
        }
      }
    });
  };

  const handleMakeHR = async (employee) => {
    try {
      await axiosSecure.patch(`/users/${employee.email}`, { role: 'hr' });
      message.success(`${employee.name} is now an HR.`);
      refetch();
    } catch (error) {
      console.error('Error making employee HR:', error);
      message.error('Error making employee HR.');
    }
  };

  const handleSalaryAdjustment = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
    form.setFieldsValue({ salary: employee.salary });
  };

  const handleSalary = async (values) => {
    console.log(values)
    try {
      await axiosSecure.patch(`/users/${selectedEmployee.email}`, { salary: values.salary });
      message.success(`${selectedEmployee.name}'s salary has been updated.`);
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      console.error('Error adjusting salary:', error);
      message.error('Error adjusting salary.');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: "image",
      key: "photo",
      render: (text, record) => (
        <img src={record.photo} alt={record.name} className="h-10 w-10 rounded-full" />
      )
    },
    {
      title: 'Designation',
      key: 'designation',
      render: (text, record) => (
        <p>{record.designation ? record.designation : 'N/A'}</p>
      )
    },
    {
      title: 'Make HR',
      key: 'makeHR',
      render: (text, record) => (
        record.role !== 'hr' && record.role !== 'admin' ? <Button onClick={() => handleMakeHR(record)}>Make HR</Button> : <p className='uppercase'>{record.role}</p>
      )
    },
    {
      title: 'Fire',
      key: 'fire',
      render: (text, record) => (
        record.isFired ? 'Fired' : record.role !== 'admin' ? <Button danger onClick={() => handleFire(record)}>Fire</Button> : <p>😂😂</p>
      )
    },
    {
      title: 'Adjust Salary',
      key: 'adjustSalary',
      render: (text, record) => (
        <Button onClick={() => handleSalaryAdjustment(record)}>Adjust Salary</Button>
      )
    }
  ];

  const renderCard = (employee) => (
    <Card hoverable title={employee.name} style={{ marginBottom: 16 }}>
      <div className='!flex !flex-col !gap-4'>
        <div className='flex gap-4'>
          <img className="w-10 h-10 rounded-full" src={employee.photo} alt={employee.name} />
          <p>Email: {employee.email}</p>
        </div>
        <p>Designation: {employee.designation ? employee.designation : 'N/A'}</p>
        <p>
          {employee.role !== 'hr' && employee.role !== 'admin' ? (
            <Button onClick={() => handleMakeHR(employee)}>Make HR</Button>
          ) : <p> Role: <span className='uppercase'>{employee.role}</span></p>}
        </p>
        <div className='flex justify-between gap-4'>
          <p>
            {employee.isFired ? (
              'Fired'
            ) : (
              employee.role !== 'admin' ? <Button danger onClick={() => handleFire(employee)}>Fire</Button> : <p> 😂😂</p>
            )}
          </p>
          <p>
            <Button onClick={() => handleSalaryAdjustment(employee)}>Adjust Salary</Button>
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <Title level={2}>All Employees</Title>
      <Switch
        checkedChildren="Card View"
        unCheckedChildren="Table View"
        checked={viewMode === 'card'}
        onChange={(checked) => setViewMode(checked ? 'card' : 'table')}
      />
      {viewMode === 'table' ? (
        <CommonTable data={employees} columns={columns} rowKey="_id" />
      ) : (
        <Row gutter={16}>
          {employees.map((employee) => (
            <Col key={employee._id} span={8}>
              {renderCard(employee)}
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title={`Adjust Salary for ${selectedEmployee ? selectedEmployee.name : ''}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSalary}
          initialValues={{ salary: selectedEmployee ? selectedEmployee.salary : 0 }}
        >
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input the salary!' }]}
          >
            <input type="number" className='p-1  border focus:outline-none' min={selectedEmployee ? selectedEmployee.salary : 0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adjust Salary
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AllEmployee.prototype={

}

export default AllEmployee;
