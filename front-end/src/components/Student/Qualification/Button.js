import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const Button =(props)=>{
    return (
        <MDBBtn className='AddButton' onClick={props.onClick}>{props.text}</MDBBtn>
    );
}

export {Button};