import "./App.css";
import './Banner.css'
import { useState } from "react";
import Axios from "axios";
import { Button, Card } from "react-bootstrap";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="bg-light">
      <div className="banner d-flex  ">

        <div className=" text-white text-start px-5 bg-warning">
          <h1 className="text text-dark text-center ">Store Employee Records ,<br />
            Make Work easier
          </h1>
        </div>

        <div className=" banner-img mt-5 pt-5 ">

        </div>
      </div>


      <div className="App ">
        <div className="information   shadow">
          <h1 className="my-5">Add New Employee</h1>
          <input
            type="text" className=" shadow  mt-3 w-50 p-3 border-0 rounded" placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          /><br />

          <input
            type="number" className=" shadow  mt-3 w-50 p-3 border-0 rounded" placeholder="Age"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          /><br />

          <input
            type="text" className="shadow   mt-3 w-50 p-3 border-0 rounded" placeholder="Country"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          /><br />

          <input
            type="text" className="shadow   mt-3 w-50 p-3 border-0 rounded" placeholder="Position"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          /><br />

          <input
            type="number" className="shadow border-0  mt-3 w-50 p-3" placeholder="Wage"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          /><br />
          <button onClick={addEmployee} className="border-0 bg-warning px-3 py-2 my-4 rounded">Add Employee</button>
        </div>
        <div className="employees">


          {/* -------------------------------------Show employee ----------------------------------------------------------------*/}


          <button onClick={getEmployees} className="border-0 bg-warning px-3 py-2 my-4 rounded">Show Employees</button>


          <div className="employee color">
            <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4  mx-5 my-5"  >
              {employeeList.map((val, key) => {
                return (
                  // <div className="employee color">
                  <div>


                    {/* <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4  mx-5 my-5"  > */}
                    <div className="col service mb-3" >
                      <div className="card h-100 py-5 ">

                        <div className="card-body text-start">
                          <h3 class="card-title text-primary">Name : {val.name}</h3>
                          <p class="card-text ">Age :  {val.age}</p>
                          <p class="card-text ">Country  :  {val.country}</p>
                          <p class="card-text">Designation : {val.position}</p>
                          <p class="card-text"> Wage : {val.wage}</p>

                        </div>

                        <div>
                          <input className="border-2   py-2  rounded me-2"
                            type="text"
                            placeholder="2000..."
                            onChange={(event) => {
                              setNewWage(event.target.value);
                            }}
                          />
                          <button className="border-0 bg-warning px-3 py-2 my-4 px-2 rounded"
                            onClick={() => {
                              updateEmployeeWage(val.id);
                            }}
                          >
                            {" "}
                            Update
                          </button>
                          <button className="border-0 bg-dark px-3 py-2 my-4 mx-2 rounded text-white"
                            onClick={() => {
                              deleteEmployee(val.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>


                      </div>
                    </div>
                    {/* </div> */}




                  </div>

                  // </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      );





      <div>


        <footer class="footer-distributed">

          <div class="footer-left">

            <h3>Shop<span>Up</span></h3>

            <p class="footer-links">
              <a href="#" class="link-1">Home</a>

              <a href="#">Blog</a>

              <a href="#">Pricing</a>

              <a href="#">About</a>

              <a href="#">Faq</a>

              <a href="#">Contact</a>
            </p>

            <p class="footer-company-name">ShopUp © 2015</p>
          </div>

          <div class="footer-center">

            <div>
              <i class="fa fa-map-marker"></i>
              <p><span>444 S. Cedros Ave</span> Dhanmondi,Dhaka,Bangladesh</p>
            </div>

            <div>
              <i class="fa fa-phone"></i>
              <p>+1.555.555.5555</p>
            </div>

            <div>
              <i class="fa fa-envelope"></i>
              <p><a href="mailto:support@company.com">support@company.com</a></p>
            </div>

          </div>

          <div class="footer-right">

            <p class="footer-company-about">
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>

            <div class="footer-icons">

              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-linkedin"></i></a>
              <a href="#"><i class="fa fa-github"></i></a>

            </div>

          </div>

        </footer>
      </div>





    </div>
  )
}

export default App;