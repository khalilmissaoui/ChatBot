import React from 'react'
import { Link } from 'react-router-dom'
import './error.css'
function Errorpage() {
    return (
       
             <div class="mainbox" style={{backgroundColor:'#95c2de'}}>
    <div class="err">4 0</div>
    <div class="err2">4</div>
    <div class="msg">Maybe you made a mistake ? maybe this page got deleted?
     Never existed in the first place?<p>Let's go <Link to="/"> home </Link> and try from there.</p></div>
      </div> 
        
    )
}

export default Errorpage
