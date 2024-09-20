import { useCallback } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(0);

  const [empleadosList,setEmpleados] = useState([]);

    const add = ()=>{
    axios.post("http://localhost:3001/create",{
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios  
    }).then(()=>{
      alert("Empleado registrado")
    });    
  }

  const getEmpleados = ()=>{
    axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });    
  }

getEmpleados();

  return (
    <div class="container">
    <div className="App">

        <div className='lista'>
        {
          empleadosList.map((val,key)=>{
            return <div className='' > {val.nombre} </div>
          })
        }
        </div>
    </div>
        <div class="card text-center">
      <div class="card-header">
        Gestion de empleados
      </div>
      <div className="card-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre: </span>
        <input type="text" 
          onChange={(event)=>{
            setNombre(event.target.value);
          }}
        className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
            <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Edad:</span>
        <input type="text" 
        onChange={(event)=>{
          setEdad(event.target.value);
        }}
        class="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Pais:</span>
        <input type="text" 
        onChange={(event)=>{
          setPais(event.target.value);
        }}
        class="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
       
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Cargo:</span>
        <input type="text" 
        onChange={(event)=>{
          setCargo(event.target.value);
        }} 
        className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Años:</span>
        <input type="text" 
        onChange={(event)=>{
          setAnios(event.target.value);
        }}
        className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      </div>
      <div class="card-footer text-body-secondary">
      <button className='btn btn-success' onClick={add}>Registrar</button>
      </div>
    </div>
    <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
  </table>
    </div>
  );
}

export default App;
