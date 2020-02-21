import React from 'react';
import {Button,Row,Col} from 'reactstrap';

class  viewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             data:props.location.state.Data
        }
    } 
    back=()=>{
        this.props.history.push({pathname:'/display'})
    }
    render(){
    return (
        <div style={{marginTop:'10px'}}>
            <Row>
            {
                this.state.data.map(res => {
                    return (
                        res.map(result => {
                            return (
                            <div className='border'> 
                              <Col>
                                   <img alt="" src={`http://localhost:3001/player/uploads/${result.profile}`}  height='200' width='200' />
                                   <div className='h3 strong'>{result.name}</div>
                                   <div><b>Email : {result.email}</b></div>
                                   <div><b>Dob : {result.dob}</b></div>
                                   {result.rolebowler? <div><b>Bowler : {result.rolebowler}</b></div>:'' }
                                   {result.rolebatsman? <div><b>Batsman : {result.rolebatsman}</b></div>:'' }
                                   <div><b>Team : {result.team}</b></div>
                             </Col>
                             </div>
                            )
                        })
                    )
                })
            }
              </Row>
            <center><Button color='dark' onClick={this.back}>Back</Button></center>
        </div>
    )
 }
}

export default viewUser
