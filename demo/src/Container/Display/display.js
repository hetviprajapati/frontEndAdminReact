import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Table,Modal,ModalBody, Input, Row, Col, Pagination, PaginationItem, PaginationLink, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import {  MDBIcon } from 'mdbreact'

import './display.css'
import * as diaplayAction from '../../Actions/actionDisplay/actionDisplay.js';

class display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chbID: [],
            pageChb: [],
            team: '',
            pagesize: 2,
            currentpage: 1,
            data: [],
            nameSearch: '',
            showImg:false,
            showImage:''
        }
        this.total = 0;
        this.flag = true;
    }
    componentDidMount() {
        this.props.action.data.playerDisplay();
    }
    check = (e) => {
        var chbarr = this.state.chbID
        var pagechb = this.state.pageChb;
        var allID = document.getElementById(`all${this.state.currentpage}`).id;
        var els = document.getElementsByName('chbSpecific');
        if (e.target.name === 'all') {
            var i;
            if (e.target.checked) {
                pagechb.push(allID);
                for (i = 0; i < els.length; i++) {
                    if (this.state.chbID.indexOf(els[i].id) === -1)
                        chbarr.push(els[i].id);
                }
            }
            else {
                pagechb = pagechb.filter(res => res !== allID);
                for (i = 0; i < els.length; i++) {
                    chbarr = chbarr.filter(res => res !== els[i].id);
                }
            }
        }
        else {
            if (!e.target.checked) {
                pagechb = pagechb.filter(res => res !== allID);
                chbarr = chbarr.filter(res => res !== document.getElementById(e.target.id).id);
            }
            else {
                var count = 0;
                for (i = 0; i < els.length; i++) {
                    if (els[i].checked)
                        count++;
                }
                if (count === els.length)
                    pagechb.push(allID);
                else
                    pagechb=pagechb.filter(res=>res === allID)
                    
                chbarr.push(document.getElementById(e.target.id).id);
            }
        }
      
        this.setState({ chbID: chbarr, pageChb: pagechb })
    }

    onEdit = (e) => {
        var data = this.props.display.result.filter(res => res._id === e.target.id);
        this.props.history.push({ pathname: '/register', state: { Data: data } })
    }

    onDelete = (e) => {
        if (window.confirm('Are you sure you want to delete player?')) {
            this.props.action.data.playerDelete(e.target.id)
                .then((response) => {
                    if (response === 200) {
                        alert("Record Deleted Successfully");
                        this.setState({ data: this.props.display.result })
                    }
                }).catch((err) => {
                    if (err === 400)
                        alert("Data not deleted");
                })
        }
    }

    componentDidUpdate() {
        if (this.props.display.result && this.flag) {
            this.setState({ data: this.props.display.result })
            this.flag = false;
        }
        this.checkchb();
    }

    pagination = () => {
        const total = this.state.data.length;
        var arr = [];
        var j = 1;
        for (var i = 0; i < (total / this.state.pagesize); i++) {
            arr.push(
                <PaginationItem>
                    <PaginationLink
                        onClick={e => this.getPage(e, j)} id={j} style={{ fontSize: '20px' }}>
                        {j}
                    </PaginationLink>
                </PaginationItem>)
            j++
        }
        this.total = j;
        return arr
    }

    getPage(e, index) {
        e.preventDefault();
        if (e.target.id) {
            this.setState({
                currentpage: e.target.id
            });
        }
        else {
            this.setState({
                currentpage: index
            });
        }
    }

    onNameSearch = (e) => {
        var reg = new RegExp("^" + e.target.value, "i");
        var arr = this.props.display.result.filter(res => reg.test(res.name))
        this.setState({ data: arr, currentpage: 1 })
    }
    sortOnAsc = () => {
        var arr = this.props.display.result.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        });
        this.setState({ data: arr, currentpage: 1 })
    }
    sortOnDesc = () => {
        var arr = this.props.display.result.sort(function (a, b) {
            return b.name.localeCompare(a.name)
        });
        this.setState({ data: arr, currentpage: 1 })
    }
    onSearch = (e) => {
        var arr;
        if (e.target.name === 'All')
            arr = this.props.display.result
        else
            arr = this.props.display.result.filter(res => res.team === e.target.name)
        this.setState({ data: arr, currentpage: 1, team: e.target.name })
    }

    checkchb = () => {
        var i = document.getElementsByName('all');
        if (this.state.pageChb.length !== 0) {
            this.state.pageChb.map((res) => {
                if (res === `all${this.state.currentpage}`) {
                    i[0].checked = true;
                    return null
                }
                else {
                    if (this.state.pageChb.indexOf(i[0].id) === -1)
                        i[0].checked = false;
                }
                return null
            })
        }
        else
            i[0].checked = false;


        if (this.state.chbID.length !== 0) {
            this.state.chbID.map(resID => {
                this.state.data
                    .slice((parseInt(this.state.currentpage) - 1) * this.state.pagesize, (parseInt(this.state.currentpage)) * this.state.pagesize)
                    .map(result => {
                        if (resID === result._id)
                            document.getElementById(result._id).checked = true;
                        else {
                            if (this.state.chbID.indexOf(result._id) === -1)
                                document.getElementById(result._id).checked = false;
                        }
                        return null
                    })
                return null
            })
        }
        else {
            var allchb = document.getElementsByName('chbSpecific');
            for (var j = 0; j < allchb.length; j++) {
                allchb[j].checked = false;
            }
            i[0].checked = false;
        }
    }
    onViewUser = () => {
        var data = [];
        this.state.chbID.map(id => {
            return data.push(this.props.display.result.filter(res => res._id === id));
        })
        console.log(data);
        this.props.history.push({ pathname: '/viewuser', state: { Data: data } })
    }
   
    showImage=(e)=>{
        console.log(e.target.src);
        this.setState({
            showImg:true,
            showImage:e.target.src
        })
    }
    toggle=()=>{
        this.setState({
            showImg:!this.state.showImg
        })
    }
    render() {
        return (
            this.state.data ? (
                <div style={{ marginTop: '20px' }}>
                    <center>
                        <h2> Player Details</h2> </center>
                    <Row>
                        <Col md={2}>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle caret color="dark" style={{ alignItems: 'left' }}>
                                    {!this.state.team || this.state.team === 'All' ? 'Search By Team' : this.state.team}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={(event) => this.onSearch(event)} name='Team 1'>Team 1</DropdownItem>
                                    <DropdownItem onClick={(event) => this.onSearch(event)} name='Team 2'>Team 2</DropdownItem>
                                    <DropdownItem onClick={(event) => this.onSearch(event)} name='Team 3'>Team 3</DropdownItem>
                                    <DropdownItem onClick={(event) => this.onSearch(event)} name='All'>All</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </Col>
                        <Col md={2} >
                            <Row style={{ marginTop: '10px' }}>
                                <Col md={1}>
                                    <MDBIcon icon="search" style={{ marginTop: '10px' }} />
                                </Col>
                                <Col md={10}>
                                    <Input type='text' onChange={this.onNameSearch} name='nameSearch' value={this.state.value} placeholder='Search by name here' style={{ backgroundColor: '#f1f1f1' }}></Input>
                                </Col>

                            </Row>
                        </Col>
                        <Col style={{ marginTop: '5px' }}>
                            <Button color='dark' size='sm' onClick={this.sortOnAsc}><MDBIcon icon="sort-alpha-down" size='lg' /></Button>
                            <Button color='dark' size='sm' onClick={this.sortOnDesc}><MDBIcon icon="sort-alpha-up-alt" size='lg' /></Button>
                        </Col>
                    </Row>
                    {console.log(this.state.showImg)}
                    <Modal isOpen={this.state.showImg} toggle={this.toggle}>
                            <ModalBody><img alt="" src={this.state.showImage} height='300' width='460' /></ModalBody>
                    </Modal>
                    {
                        <Table striped >
                            <thead>
                                <tr>
                                    <th><input type="Checkbox" name='all' id={`all${parseInt(this.state.currentpage)}`} onChange={this.check} />  All</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Dob</th>
                                    <th>Blowler Style</th>
                                    <th>Batsman Style</th>
                                    <th>Team</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data
                                        .slice((parseInt(this.state.currentpage) - 1) * this.state.pagesize, (parseInt(this.state.currentpage)) * this.state.pagesize)
                                        .map(result => {
                                            return (
                                                <tr>
                                                    <td><input type="checkbox" name='chbSpecific' id={result._id} onChange={this.check} /></td>
                                                    <td><img alt="" onMouseOver={this.showImage} src={`http://localhost:3001/player/uploads/${result.profile}`} height='100' width='100' /></td>
                                                    <td><b>{result.name}</b></td>
                                                    <td><b>{result.email}</b></td>
                                                    <td><b>{result.dob}</b></td>
                                                    <td><b>{result.rolebowler}</b></td>
                                                    <td><b>{result.rolebatsman}</b></td>
                                                    <td><b>{result.team}</b></td>
                                                    <td><Button  id={result._id} onClick={this.onEdit}><MDBIcon icon="fas fa-edit"  /></Button></td>
                                                    {/* <td><MDBBtn id={result._id} onClick={this.onEdit}><i class="fas fa-edit"></i></MDBBtn></td> */}
                                                    <td><Button color='danger' id={result._id} onClick={this.onDelete}><MDBIcon icon="fas fa-trash"  /></Button></td>
                                                    {/* <td><MDBBtn color='danger' id={result._id} onClick={this.onDelete}><i class="fas fa-trash"></i></MDBBtn></td> */}
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </Table>
                    }
                    <Row>
                        <Col>
                            <Pagination size="lg" >
                                <PaginationItem >
                                    <PaginationLink first style={{ fontSize: '20px' }} onClick={e => this.getPage(e, 1)} />
                                </PaginationItem>
                                <PaginationItem disabled={parseInt(this.state.currentpage) <= 1} >
                                    <PaginationLink previous onClick={e => this.getPage(e, parseInt(this.state.currentpage - 1))} value='previous' style={{ fontSize: '20px' }} />
                                </PaginationItem>
                                {
                                    this.pagination()
                                }
                                <PaginationItem disabled={this.state.currentpage >= this.total - 1}>
                                    <PaginationLink next onClick={e => this.getPage(e, parseInt(this.state.currentpage) + 1)} value='next' style={{ fontSize: '20px' }} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last style={{ fontSize: '20px' }} onClick={e => this.getPage(e, this.total - 1)} />
                                </PaginationItem>
                            </Pagination>
                        </Col>
                        <Col>
                            <Button className="float-right" color='dark' onClick={e => this.props.history.push({ pathname: '/register' })}>Add Player</Button>
                            {this.state.chbID.length !== 0 ? (<Button className="float-right" onClick={this.onViewUser} color="dark">View User</Button>) : ''}
                        </Col>
                    </Row>
                </div>
            ) : null
        )
    }
}
const mapStatetoProps = (state) => {
    const { display } = state
    return {

        display
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        data: bindActionCreators(diaplayAction, dispatch)
    }
})

export default connect(mapStatetoProps, mapDispatchToProps)(display)