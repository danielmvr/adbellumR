import React from 'react';
import Weapons from '../Weapons';

export default function Form(props) {

  return (
      <div id={props.id}>
      <label>HP</label>
      <input type="number" id={`${props.id}hp`} />
      <label>CA</label>
      <input type="number" id={`${props.id}ca`} />
      <label>Arma</label>
      <Weapons iden={`${props.id}weapon`} />
      </div>
  );
}
