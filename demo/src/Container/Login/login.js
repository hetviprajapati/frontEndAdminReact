import React, { Component } from 'react'
import {NavItem,NavLink,Nav} from 'reactstrap';
import { MDBInput ,MDBBtn } from "mdbreact";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './login.css';
import * as actionLogin from '../../Actions/actionLoginLogout/actionLoginLogout.js'


class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:'',
             password:'',
             validEmail:true,
             validPassword:true
        }
    }
    componentDidUpdate() {
        if(this.props.login.err_msg === 'Invalid Email') {
            if(this.state.validEmail)
            {
                this.setState({
                   validEmail:false,
                   validPassword:true
               });
            }
        }
        else if(this.props.login.err_msg === 'Invalid Password') {
            if(this.state.validPassword)
            {
                this.setState({
                   validPassword:false,
                   validEmail:true
               });
            }
        }
    }
    getData=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onLogin=(e)=>{
            e.preventDefault();
            this.props.action.login.loginUser({
                email:this.state.email,
                password:this.state.password
            })
    }
    render() {
        return (
            <div className='outerdiv'>
            <div className='innerdiv'>
                <MDBInput icon="envelope"  label="Enter Email"  size="lg" name="email" 
                   className={this.state.validEmail ? "" : "form-control is-invalid"}
                   value={this.state.value} onBlur={this.getData}>
                   <div className="invalid-feedback">Email ID is Incorrect</div> 
                </MDBInput>
                <MDBInput type="password" icon="lock" label="Enter Password" size="lg" name="password"
                   className={this.state.validPassword ? "" : "form-control is-invalid"} 
                   value={this.state.value}  onBlur={this.getData}>
                   <div className="invalid-feedback">Password is Incorrect</div> 
                </MDBInput>
                <center>
                    <MDBBtn  color="dark" onClick={this.onLogin}>Login</MDBBtn >
                    <Nav>
                    <NavItem className='navitem'>
                        <NavLink tag={Link} to="/register">New User?</NavLink>
                    </NavItem>
                    </Nav>
                </center>
                 </div>
             </div>
        )
    }
}

const mapStatetoProps=(state)=>{
   const {login}=state
   return{
       login:login
   }
}

const mapDispatchToProps=dispatch=>({
    action:{
        login:bindActionCreators(actionLogin,dispatch)
    }
})

export default connect(mapStatetoProps,mapDispatchToProps)(login)
