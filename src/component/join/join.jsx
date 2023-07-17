import React from 'react'
import "./join.css";
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import { useState } from 'react';

let user;



const Join = () => {
    const [name, setname] = useState("");

    const sendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }


    return (
        <div className='JoinPage'>
            <div className='JoinCointainer'>
                <h1>Chatt App</h1>
                <input onChange={(e) => { setname(e.target.value) }} type="text" id='joinInput' />
                <Link onClick={(e)=>!name ?e.preventDefault():null} to="/chat"><Button type="primary" onClick={sendUser} className='joinbtn'>Login</Button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }
