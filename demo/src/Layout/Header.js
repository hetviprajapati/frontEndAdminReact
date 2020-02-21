import React,{Component} from 'react'
import {Navbar,NavbarBrand,Nav,NavItem,Button,NavLink} from 'reactstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
import * as actionLogout from '../Actions/actionLoginLogout/actionLoginLogout.js'

 class Header extends Component {
   onLogout=(e)=>{
     e.preventDefault();
    this.props.action.logout.logoutUser();
   }
   render(){
      return (
    (this.props.login.token && this.props.login.token!=="")?
      <Navbar color="light" light expand="md">
        <NavbarBrand to="/">Player</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <Button color="dark" onClick={this.onLogout.bind(this)}>Logout</Button>
            </NavItem>
          </Nav>
      </Navbar>
      :
      <Navbar color="light" light expand="md">
      <NavbarBrand to="/">Home</NavbarBrand>
      <Nav>
        <NavItem >
            <NavLink  tag={Link} to="/">Login</NavLink>
        </NavItem>
        </Nav>
        <Nav>
        <NavItem>
            <NavLink tag={Link} to="/register">Registration</NavLink>
        </NavItem>
        </Nav>
    </Navbar>
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
    logout:bindActionCreators(actionLogout,dispatch)
    }
})
export default connect(mapStatetoProps,mapDispatchToProps)(Header)