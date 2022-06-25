import React from 'react'
import {
 
    Routes,
    Route,
 
  } from "react-router-dom";
import { Tenant,Dashboard } from '../../pages';


function Admin() {
  return (
    <Routes>
            <Route path="/" element={<Dashboard />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tenant" element={<Tenant />} />
        </Route>
  </Routes>
  )
}

export default Admin;