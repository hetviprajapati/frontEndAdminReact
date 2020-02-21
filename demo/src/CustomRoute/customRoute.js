import React, { Component } from "react";
import { Route,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as logoutAction from '../Actions/actionLoginLogout/actionLoginLogout'
class CRoute extends Component{
    getExtractedJson({component,cprivate,crole,actions,login,...rest})
    {
         return rest;
    }

    authTimer=()=>{
        setTimeout(() => {
            this.props.action.data.logoutUser();
        }, 5000);
    }

   render(){
     //  this.authTimer();
       const rest=this.getExtractedJson(this.props);
       const isUserLoggedIN=this.props.login.token ? this.props.login.token!=="":false;
       const userCurrentRole=this.props.login.role;
       const {component,cprivate}=this.props;
       const Component=component;
       let redirectTo=undefined;

       if(isUserLoggedIN && rest.path==='/' && userCurrentRole==='admin') 
            redirectTo='/display';
       else if(!isUserLoggedIN && cprivate && !userCurrentRole)
            redirectTo='/';  
        else if(!isUserLoggedIN && rest.path === '/unAuthorizedAccess')
             redirectTo='/';
        else if(isUserLoggedIN && rest.path==='/' && userCurrentRole==='user')
              redirectTo='/unAuthorizedAccess';
       return(
          <Route
           {...rest}
           render={props=>(
               (redirectTo)?<Redirect to={{pathname:redirectTo,state:{from:props.location}}}/>:<Component {...props}/>
           )}
          />
       )
   }
}
const mapStatetoProps=(state)=>{
    const {login}=state
    return{
        login:login
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        data: bindActionCreators(logoutAction, dispatch)
    }
})
export default connect(mapStatetoProps,mapDispatchToProps)(CRoute)