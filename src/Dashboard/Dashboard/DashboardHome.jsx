// import { useState, useEffect } from 'react';
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";
// import { Modal, Input, Button, Form } from 'antd';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';


const DashboardHome = () => {
  const { user } = useAuth();
  const [userData, refetch, isPending] = useUser();
  const { name, email, role, photo, bank_account_no, designation, salary } = userData || {};
  // const axiosSecure = useAxiosSecure();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [missingFields, setMissingFields] = useState([]);
  // const [form] = Form.useForm();

  // useEffect(() => {
  //   const checkMissingFields = () => {
  //     const fields = [
  //       { key: 'role', value: role, label: 'Role' },
  //       { key: 'bank_account_no', value: bank_account_no, label: 'Bank Account No' },
  //       { key: 'designation', value: designation, label: 'Designation' }
  //     ];
  //     const missing = fields.filter(field => !field.value).map(field => field.label);
  //     setMissingFields(missing);
  //     if (missing.length > 0) {
  //       setIsModalOpen(true);
  //     }
  //   };

  //   if (userData) {
  //     checkMissingFields();
  //   }
  // }, [userData]);

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleFormSubmit = (values) => {

  //   axiosSecure.patch(`/users/${email}`, values)
  //     .then(() => {
  //       refetch(); 
  //       handleCloseModal();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-20">Hey, Welcome back <span className="text-blue-700">{name}</span>!</h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
          {/* user image */}
          <div className="text-center border rounded-lg border-blue-700 p-1 group">
            <img className="size-72 rounded-lg group-hover:rotate-45 group-hover:transition hover:delay-200 hover:rounded-full" src={photo} alt="" />
          </div>
          {/* user details */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-lg lg:text-xl font-bold">Name: <span className=" text-lg lg:text-xl font-normal">{name}</span></p>
              </div>

              <div>
                <p className="text-lg lg:text-xl font-bold">Email: <span className=" text-lg lg:text-xl font-normal">{email}</span></p>
              </div>
              <div>
                <p className="text-lg lg:text-xl font-bold">Role: <span className=" text-lg lg:text-xl font-normal">{role}</span></p>
              </div>
              <div>
                <p className="text-lg lg:text-xl font-bold">Bank Account No: <span className=" text-lg lg:text-xl font-normal">{bank_account_no}</span></p>
              </div>
              <div>
                <p className="text-lg lg:text-xl font-bold">Designation: <span className=" text-lg lg:text-xl font-normal">{designation}</span></p>
              </div>
              <div>
                <p className="text-lg lg:text-xl font-bold">Salary: <span className=" text-lg lg:text-xl font-normal">{salary} <span className=' text-blue-700'>$</span></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal title="Missing Information" visible={isModalOpen} onCancel={handleCloseModal} footer={null}>
        <p>Please provide the following information:</p>
        <ul className="list-disc list-inside">
          {missingFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          {missingFields.includes('Role') && (
            <Form.Item name="role" label="Role" initialValue={role} rules={[{ required: true, message: 'Please input your role!' }]}>
              <Input />
            </Form.Item>
          )}
          {missingFields.includes('Bank Account No') && (
            <Form.Item name="bank_account_no" label="Bank Account No" initialValue={bank_account_no} rules={[{ required: true, message: 'Please input your bank account number!' }]}>
              <Input />
            </Form.Item>
          )}
          {missingFields.includes('Designation') && (
            <Form.Item name="designation" label="Designation" initialValue={designation} rules={[{ required: true, message: 'Please input your designation!' }]}>
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button className=' !bg-blue-700/50' type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};



export default DashboardHome;






// import { useState, useEffect } from 'react';
// import useAuth from "../../Hooks/useAuth";
// import useUser from "../../Hooks/useUser";
// import { Modal, Input, Button, Form } from 'antd';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import Loading from '../../Components/Loading';

// const DashboardHome = () => {
//   const { user } = useAuth();
//   const [userData, refetch, isPending] = useUser();
//   const { name, email, role, photo, bank_account_no, designation, salary } = userData || {};
//   const axiosSecure = useAxiosSecure();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [missingFields, setMissingFields] = useState([]);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const checkMissingFields = () => {
//       const fields = [
//         { key: 'role', value: role, label: 'Role' },
//         { key: 'bank_account_no', value: bank_account_no, label: 'Bank Account No' },
//         { key: 'designation', value: designation, label: 'Designation' }
//       ];
//       const missing = fields.filter(field => !field.value).map(field => field.label);
//       setMissingFields(missing);
//       if (missing.length > 0) {
//         setIsModalOpen(true);
//       }
//     };

//     if (userData) {
//       checkMissingFields();
//     }
//   }, [userData]);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFormSubmit = (values) => {

//     axiosSecure.patch(`/users/${email}`, values)
//       .then(() => {
//         refetch(); 
//         handleCloseModal();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   if (isPending) {
//     return <Loading />
//   }

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <h1 className="text-3xl font-bold text-center mb-20">Hi, Welcome <span className="text-blue-700">{name}</span>!</h1>

//         <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
//           {/* user image */}
//           <div className="text-center border rounded-lg border-blue-700 p-1">
//             <img className="size-72 rounded-lg hover:rotate-45 hover:transition hover:delay-200 hover:rounded-full" src={photo} alt="" />
//           </div>
//           {/* user details */}
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Name: <span className=" text-lg lg:text-xl font-normal">{name}</span></p>
//               </div>

//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Email: <span className=" text-lg lg:text-xl font-normal">{email}</span></p>
//               </div>
//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Role: <span className=" text-lg lg:text-xl font-normal">{role}</span></p>
//               </div>
//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Bank Account No: <span className=" text-lg lg:text-xl font-normal">{bank_account_no}</span></p>
//               </div>
//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Designation: <span className=" text-lg lg:text-xl font-normal">{designation}</span></p>
//               </div>
//               <div>
//                 <p className="text-lg lg:text-xl font-bold">Salary: <span className=" text-lg lg:text-xl font-normal">{salary} <span className=' text-blue-700'>$</span></span></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal title="Missing Information" visible={isModalOpen} onCancel={handleCloseModal} footer={null}>
//         <p>Please provide the following information:</p>
//         <ul className="list-disc list-inside">
//           {missingFields.map((field, index) => (
//             <li key={index}>{field}</li>
//           ))}
//         </ul>
//         <Form form={form} onFinish={handleFormSubmit} layout="vertical">
//           {missingFields.includes('Role') && (
//             <Form.Item name="role" label="Role" initialValue={role} rules={[{ required: true, message: 'Please input your role!' }]}>
//               <Input />
//             </Form.Item>
//           )}
//           {missingFields.includes('Bank Account No') && (
//             <Form.Item name="bank_account_no" label="Bank Account No" initialValue={bank_account_no} rules={[{ required: true, message: 'Please input your bank account number!' }]}>
//               <Input />
//             </Form.Item>
//           )}
//           {missingFields.includes('Designation') && (
//             <Form.Item name="designation" label="Designation" initialValue={designation} rules={[{ required: true, message: 'Please input your designation!' }]}>
//               <Input />
//             </Form.Item>
//           )}
//           <Form.Item>
//             <Button className=' !bg-blue-700/50' type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default DashboardHome;

