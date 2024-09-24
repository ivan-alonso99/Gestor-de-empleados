import { useCallback } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState();
  const [id,setid] = useState();


  const [editar,setEditar] = useState(false);


  const [empleadosList,setEmpleados] = useState([]);

    const add = ()=>{
    axios.post("http://localhost:3001/create",{
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios  
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "Registro exisitoso!",
        text: "El empleado "+nombre+" fue registrado con exito!",
        icon: "success",
        timer:3000
      });
    });    
  }

  const update = ()=>{
    axios.put("http://localhost:3001/update",{
    id:id,
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios  
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "Actualizacion exisitosa!",
        text: "El empleado "+nombre+" fue actualizado con exito!",
        icon: "success",
        timer:3000
      });
    });    
  }

  const deleteEmple = (val)=>{

    Swal.fire({
      title: "Estas seguro?",
      text: "Realmente desea eliminar a "+val.nombre+"",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();  
          Swal.fire({
            title: "Eliminado!",
            text: val.nombre+" Fue eliminado",
            icon: "success",
            timer:4000
          });
        });    
      }
    });

  }

  const limpiarCampos = ()=>{
      setAnios("");
      setNombre("");
      setCargo("");
      setEdad("");
      setPais("");
      setid("");
      setEditar(false)
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setid(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);

  }

  const getEmpleados = ()=>{
    axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });    
  }

getEmpleados();

  return (
    <div className="container">
        <div className="card text-center">
      <div className="card-header">
        Gestion de empleados
      </div>
      <div className="card-body">
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre: </span>
        <input type="text" 
          onChange={(event)=>{
            setNombre(event.target.value);
          }}
        className="form-control"  value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
            <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Edad:</span>
        <input type="text" value={edad} 
        onChange={(event)=>{
          setEdad(event.target.value);
        }}
        className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Pais:</span>
        <input type="text"  value={pais} 
        onChange={(event)=>{
          setPais(event.target.value);
        }}
        className="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
       
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Cargo:</span>
        <input type="text" value={cargo}
        onChange={(event)=>{
          setCargo(event.target.value);
        }} 
        className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Años:</span>
        <input type="text" value={anios}
        onChange={(event)=>{
          setAnios(event.target.value);
        }}
        className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      </div>
      <div className="card-footer text-body-secondary">
        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
           </div>
           :<button className='btn btn-success' onClick={add}>Registrar</button>

        }
      </div>
    </div>
    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
      </thead>
      <tbody>
      {
          empleadosList.map((val,key)=>{
            return <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarEmpleado(val)
                          } }
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteEmple(val);
                          }} className="btn btn-danger">Eliminar</button>
                      </div>
                  </td>
              </tr>
            
            
          })
        }

        
      </tbody>
  </table>
    </div>
  );
}

export default App;
