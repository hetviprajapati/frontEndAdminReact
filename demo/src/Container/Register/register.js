import React, { Component } from 'react'
import {Button,Form,FormGroup,FormFeedback,Label,Input,Col} from 'reactstrap';

import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as actionRegister from '../../Actions/actionRegister/actionRegister.js'
import * as actionUpdate from '../../Actions/actionUpdate/actionUpdate.js'
import './register.css';

class register extends Component {
     constructor(props) {
        super(props)
        this.state = {
             Bowler:'',
             Batsman:'',
             name:'',
             dob:'',
             email:'',
             password:'',
             cpassword:'',
             txtBowler:'',
             txtBatsman:'',
             team:'',
             profile:'',
             img:'',
             err:{validName:true,validUniqueEmail:true,validRole:true,validdob:true,validTeam:true,validEmail:true,validPassword:true,validPass:true,validProfile:true}
        }
        this.flag=false;
        this.data='';
    }
    GetData =(e)=>{
    if(e.target.name==='Bowler' || e.target.name==='Batsman')
    {
        if(!e.target.checked)
        {
            if(e.target.name==='Bowler')
                this.setState({  Bowler:'',  txtBowler:''  })
            else 
                this.setState({   Batsman:'',txtBatsman:''  })
        }
        else
             this.setState({  [e.target.name]:e.target.value  }) 
    }
    else if(e.target.name==='profile')
          this.setState({  [e.target.name]:e.target.files[0] }) 
    else
        this.setState({ [e.target.name]:e.target.value  }) 
    }

    validate=(e)=>{
        var errm={...this.state.err}
        if(e.target.name==='name')
        {
            if(! /^[a-zA-Z]+$/.test(e.target.value))
               errm.validName=false
            else
               errm.validName=true
        }
        if(e.target.name==='password')
        {
            if(e.target.value.length<8)
                errm.validPass=false
            else
                errm.validPass=true
        }
        if(e.target.name==='email')
        {
             if(! /[a-z0-9].*\@[a-z].*\.com/g.test(e.target.value))
               errm.validEmail=false
            else
               errm.validEmail=true
        }
        if(e.target.name==='cpassword')
        {
            if(this.state.password!==e.target.value)
               errm.validPassword=false
            else
               errm.validPassword=true
        }
        this.setState({  err:errm  })
    }

    onSubmit=(e)=>{
       e.preventDefault();
       this.flag=false
       var  errm={...this.state.err}
       errm.validUniqueEmail=true;

         if(this.state.name==='' || errm.validName===false)
             errm.validName=false;
        else
            errm.validName=true;

        if(this.state.email==='' || errm.validEmail===false)
             errm.validEmail=false;
        else
            errm.validEmail=true;   

        if(this.state.password==='' || errm.validPass===false )
            errm.validPass=false;
        else
            errm.validPass=true;   

        if(this.state.cpassword==='' || errm.validPassword===false)
            errm.validPassword=false;
        else
            errm.validPassword=true;  

        if(this.state.txtBowler==='' && this.state.txtBatsman==='')
            errm.validRole=false;
        else
            errm.validRole=true;

        if(this.state.dob==='')
             errm.validdob=false;
        else
            errm.validdob=true;

        if(this.state.team==='' || this.state.team==='--select--')
             errm.validTeam=false;
        else
            errm.validTeam=true;

        if(this.state.profile){
            if(this.state.profile.type ==='image/png' || this.state.profile.type ==='image/jpeg')
                errm.validProfile=true;
            else
               errm.validProfile=false;
        }
        else
             errm.validProfile=true;
    
        this.setState({ err:errm })
        
        var arr=Object.values(errm);
        arr.map((item)=>{
            if(!item)
            {
                this.flag=true
                return this.flag
            }  
            return this.flag
        })
        
        if(this.flag)
            return

        const fd = new FormData();
        fd.append('name',this.state.name);
        fd.append('email',this.state.email);
        fd.append('password',this.state.password);
        fd.append('dob',this.state.dob);
        fd.append('rolebowler',this.state.txtBowler);
        fd.append('rolebatsman',this.state.txtBatsman);
        fd.append('team',this.state.team);
        fd.append('profile',this.state.profile);

        if(e.target.name==='Register')  
        {
            this.props.action.data.playerRegister(fd)
            .then((response)=>{
                if(response===200)
                    this.props.history.push({pathname: '/'})
            }).catch((err)=>{
                if(err===400)
                {
                    errm.validUniqueEmail=false
                        this.setState({  err:errm  })
                }
            })
        }
        else
        {
            this.props.action.update.playerUpdate(this.data._id,fd)
            .then((response)=>{
                if(response===200)
                   this.props.history.push({pathname: '/display'})
            }).catch((err)=>{
                if(err===400)
                   alert(err);
            })
        }
    }
    componentWillMount(){
        if(this.props.location.state)
        {
            debugger;
            this.data=this.props.location.state.Data[0];
            if(this.data.rolebowler!=='' || this.data.rolebowler!==undefined)
                this.setState({  Bowler:'Bowler'  })
            if(this.data.rolebatsman!=='' || this.data.rolebatsman!==undefined)
                this.setState({  Batsman:'Batsman' })
            this.setState({
                name:this.data.name,
                dob:this.data.dob,
                email:this.data.email,
                team:this.data.team,
                txtBowler:this.data.rolebowler,
                txtBatsman:this.data.rolebatsman,
                password:this.data.password,
                cpassword:this.data.password,
                img:`http://localhost:3001/player/uploads/${this.data.profile}`
            })
        }
    }
    render() {
        return (
        <center>
          <div className='maindiv'>
          <h2><font color={'#292953'}><b>{!this.data?'Player Registration':'Edit Player'}</b></font></h2><br/>
            <div className='insidediv'>
            <Form >
                 <FormGroup row>
                   <Label sm={ {size:2,offset:2}}><b>Name :</b></Label>
                    <Col sm={ {size:6,offset:2}}>
                         <Input invalid={!this.state.err.validName} type="text" name="name" value={this.state.name} onChange={this.GetData} onBlur={this.validate} placeholder="Enter name" />
                         <FormFeedback className='fontsize'>Enter valid name</FormFeedback>
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label  sm={{size:2,offset:2}}><b>DOB : </b></Label>
                    <Col  sm={{size:6,offset:2}}>
                         <Input invalid={!this.state.err.validdob}  type="date" name="dob" min={moment().format("YYYY-MM-DD")} value={moment(this.state.dob).format("YYYY-MM-DD")}  onBlur={this.validate} onChange={this.GetData}  />
                         <FormFeedback>Required DOB</FormFeedback>
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label sm={{size:2,offset:2}}><b>Email : </b></Label>
                    <Col sm={{size:6,offset:2}}>
                         <Input invalid={!this.state.err.validEmail || !this.state.err.validUniqueEmail}  type="email" name="email" value={this.state.email} onBlur={this.validate} onChange={this.GetData}  />
                         {!this.state.err.validEmail?<FormFeedback>Enter Valid Email</FormFeedback>:""}
                         {!this.state.err.validUniqueEmail?<FormFeedback>Email ID already taken</FormFeedback>:""} 
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label  sm={{size:2,offset:2}}><b>Password : </b></Label>
                    <Col sm={{size:6,offset:2}}>
                         <Input invalid={!this.state.err.validPass}  type="password" name="password"  value={this.state.password}   disabled={this.data ? true : false} onBlur={this.validate} onChange={this.GetData}  />
                         <FormFeedback>Password Must be 8 charactor long</FormFeedback>
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label  sm={{size:2,offset:2}}><b>Confirm Password : </b></Label>
                    <Col sm={{size:6,offset:2}}>
                         <Input invalid={!this.state.err.validPassword}  type="password" name="cpassword"  value={this.state.cpassword} disabled={this.data ? true : false} onBlur={this.validate} onChange={this.GetData}  />
                         <FormFeedback>Password not matched!!</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={{size:2,offset:2}}><b>Role : </b></Label>
                    <Col sm={{size:2,offset:2}}>
                         <Input invalid={!this.state.err.validRole} type="checkbox"  name='Bowler' value="Bowler"  checked={this.state.Bowler?true:false}  onChange={this.GetData}  />Bowler
                           {
                                    this.state.Bowler==='Bowler'?( 
                                    <Input  type='text'  name='txtBowler' value={this.state.txtBowler} onChange={this.GetData}/>
                                ) : ('')
                          }
                    </Col>
                    <Col sm={{size:2}}>
                        <Input invalid={!this.state.err.validRole} type="checkbox" name='Batsman' value="Batsman"  checked={this.state.Batsman?true:false} onChange={this.GetData}  />Batsman
                         {
                                    this.state.Batsman==='Batsman'?( 
                                    <Input  type='text'  name='txtBatsman' value={this.state.txtBatsman} onChange={this.GetData}/>
                                ) : ('')
                          }
                            <FormFeedback>One of the role must be required with style</FormFeedback>
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label  sm={{size:2,offset:2}}><b>Team : </b></Label>
                    <Col sm={{size:6,offset:2}}>
                         <Input invalid={!this.state.err.validTeam} type="select" name="team"   value={this.state.team?this.state.team:'--select--'}  onChange={this.GetData}>
                            <option>--select--</option>
                            <option>Team 1</option>
                            <option>Team 2</option>
                            <option>Team 3</option>
                        </Input>
                         <FormFeedback>Please select Team</FormFeedback>
                    </Col>
                </FormGroup>
                 <FormGroup row>
                    <Label  sm={{size:2,offset:2}}><b>Profile : </b></Label>
                    <Col sm={{size:5,offset:2}}>
                        {this.state.img?!this.state.profile?<img alt="" src={this.state.img} height='100' width='100'/>:<img alt="" src= {URL.createObjectURL(this.state.profile)} height='100' width='100'/>:""} 
                         <Input invalid={!this.state.err.validProfile}  type="file" name="profile"  value={this.state.value} onChange={this.GetData}  />
                         <FormFeedback>Upload profile in png or jpeg format</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Col sm={{size:8,offset:2}}>
                   <Button color="dark" name={this.data?'Update':'Register'} onClick={this.onSubmit}>{this.data?'Update':'Register'}</Button>
                </Col>
                </FormGroup>
            </Form>  
            <Button color="dark" onClick={e=>{this.props.history.push('/')}} size='sm'>Login</Button>
            </div>
     </div>
     </center>
        )
    }
}
const mapStatetoProps=(state)=>{
    const {register}=state
     return{
           register:register
     }
}
const mapDispatchToProps=dispatch=>({
    action:{
        data:bindActionCreators(actionRegister,dispatch),
        update:bindActionCreators(actionUpdate,dispatch)
    }
})
export default connect(mapStatetoProps,mapDispatchToProps)(register)