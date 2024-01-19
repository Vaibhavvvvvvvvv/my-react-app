import React from 'react';

const EmployeeTable = ({ empList, handleDelete }) => {
  return (
    <div className="col-7">
      <div className="row empData">
        {empList.length > 0 ? (
          <table className="table table-secondary table-hover">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Age</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((employee) => (
                <tr key={employee.email}>
                  <td>{employee.email}</td>
                  <td>{employee.pass}</td>
                  <td>{employee.age}</td>
                  <td>{employee.bloodGroup}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(employee.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h5>No data available</h5>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
