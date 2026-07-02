import React, { useState, useEffect } from 'react' // 1. Added useEffect
import { createEmployee, getEmployeeById, updateEmployee } from '../service/EmployeeService' // 2. Assuming you have these service methods
import { useNavigate, useParams } from 'react-router-dom'

export const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id} = useParams();
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate();

  // 3. FETCH DATA IF UPDATE MODE: Pull existing employee data on load if `id` exists
  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(err => {
        console.error("Error fetching employee data:", err);
      })
    }
  }, [id]); // Triggers again if the URL id changes

  // 4. DYNAMIC SAVE HANDLER: Decides whether to POST (create) or PUT (update)
  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email }
      console.log(employee)

      if (id) {
        // Update Logic
        updateEmployee(id, employee).then((response) => {
          console.log("Updated successfully:", response.data);
          navigator('/employees')
        }).catch(err => {
          console.error(err);
        })
      } else {
        // Create Logic
        createEmployee(employee).then((response) => {
          console.log("Created successfully:", response.data); 
          navigator('/employees')
        }).catch(err => {
          console.error(err);
        }) 
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  } 

  function pageTitle(){
    if(id){
       return <h2 className='text-center'>Update Employee</h2>
    } else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div>
      <div className='container'><br/> <br />
        <div className='row'>
          <div className='card col-md-6 offset-md-3'>
            {pageTitle()}
            <div className='card-body'>
              <form onSubmit={saveOrUpdateEmployee}> {/* Updated to dynamic function */}

                <div className='form-group mb-3'>
                  <label className='form-label'>First Name</label>
                  <input 
                    type='text' 
                    placeholder="Enter Employee's First Name"
                    name='firstName'
                    value={firstName}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>

                <div className='form-group mb-3'>
                  <label className='form-label'>Last Name</label>
                  <input 
                    type='text' 
                    placeholder="Enter Employee's Last Name"
                    name='lastName'
                    value={lastName}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </div>

                <div className='form-group mb-3'>
                  <label className='form-label'>Email</label>
                  <input 
                    type='text' 
                    placeholder="Enter Employee's Email"
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>

                <button type='submit' className='btn btn-success'>Submit</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent;