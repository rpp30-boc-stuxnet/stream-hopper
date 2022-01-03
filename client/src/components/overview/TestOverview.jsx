import React from 'react';
import { useParams } from 'react-router-dom';

export default function TestOverview() {

  let params = useParams();

  return (
    <>
      <h1>You made it to the overview</h1>
      <h3>{params.id}</h3>
    </>
  )
}