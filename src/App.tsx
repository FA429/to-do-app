//import React, { useEffect, useState } from "react";
import AddToDo from './addToDo';
import './App.css'
import ShowToDo from "./ShowToDo";


export default function App(){
  return (

<div className="background-image">
    <AddToDo></AddToDo>
      <ShowToDo></ShowToDo>
    </div>

    
  );
}