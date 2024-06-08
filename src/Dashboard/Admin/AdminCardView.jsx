import { Button, Card } from "antd";
import PropTypes from 'prop-types';

const AdminCardView = ({ employee, handleMakeHR, handleFire, handleSalaryAdjustment }) => {
    return (
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
                employee.role !== 'admin' ? <Button danger onClick={() => handleFire(employee)}>Fire</Button> : <p> Power Full User  </p>
              )}
            </p>
            <p>
              <Button onClick={() => handleSalaryAdjustment(employee)}>Adjust Salary</Button>
            </p>
          </div>
        </div>
      </Card>
    );
};

AdminCardView.propTypes = {
    employee: PropTypes.object.isRequired,
    handleMakeHR: PropTypes.func.isRequired,
    handleFire: PropTypes.func.isRequired,
    handleSalaryAdjustment: PropTypes.func.isRequired
}

export default AdminCardView;