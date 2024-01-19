import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable'; 
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
const Home = () => {
  const [empList, setEmpList] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    age: '',
    bloodGroup: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { email, pass, age, bloodGroup } = formData;

    if (email && pass && age && bloodGroup) {
      const encryptedPassword = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
      const emp = { email, pass: encryptedPassword, age, bloodGroup };

      if (empList.some((element) => element.email === emp.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${emp.email} is already exist!`,
          footer: '<a href="#">do not add duplicate email</a>',
        });
      } else {
        if (parseInt(age) < 18) {
          Swal.fire({
            title: 'Invalid Age',
            text: 'Age must be 18 and above',
            icon: 'error',
          });
          return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
          Swal.fire({
            title: 'Invalid Password',
            text: 'Password must contain at least one special character',
            icon: 'error',
          });
          return;
        }

        setEmpList([...empList, emp]);
        Swal.fire({
          title: 'Good Job!',
          text: 'Employee details added successfully',
          icon: 'success',
        });
        setFormData({ email: '', pass: '', age: '', bloodGroup: '' });
      }
    } else {
      Swal.fire({
        title: 'Cannot be empty',
        text: 'Fill all the input fields',
        icon: 'warning',
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd3',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEmpList = empList.filter((a) => a.email !== id);
        setEmpList(updatedEmpList);
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="container">
      <h4 className="my-5 bg-dark text-white p-3">Daily Entry</h4>
      <div className="row">
        <div className="col-4">
          <div className="card bg-dark text-center text-white">
            Employee Details form
          </div>
          <div className="card-body">
            <fieldset>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAge">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="Enter Age"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputBloodGroup">Blood Group</label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodGroup"
                  placeholder="Enter Blood Group"
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </fieldset>
          </div>
          <div className="card-footer text-muted">
            <h3>Employee management system</h3>
          </div>
        </div>
      </div>
      <div className="col-1"></div>
<div className="col-7">
<EmployeeTable empList={empList} handleDelete={handleDelete} />
</div>
</div>
  );
};
export default Home;
