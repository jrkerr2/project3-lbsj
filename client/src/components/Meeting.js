import React, { Component } from 'react';
import {Grid, Col, Row } from 'react-bootstrap';
import Chat from './chat/Chat';
import axios from 'axios';
import './Meeting.css'



export default class Meeting extends Component {
    state ={
        meeting:'',
        user: ''
    }

    // get meeting method// 
    componentDidMount() {
        this.askName();
        setInterval(() => {
            //console.log('Alligator!!!!');
            axios.get(`/api/meetings/${ this.props.match.params.meetingId }`)
        //axios.get("/api/meetings/{}")
        .then(res=>{
            this.setState({ meeting: res.data });
            console.log(res.data)
        })
          }, 1000);
        
        
        
        console.log(this.state.meeting)
        
    }

    askName() {        
        var person = prompt("Please enter your name:", "");
        if (person !== null && person !== "") {
            localStorage.setItem('user', person);
            this.setState({ user: person });
            console.log("almost to put")
            axios.put(`/api/meetings/${ this.props.match.params.meetingId }`, {

                attendees: person
                }
            )
            .then(response => {
                console.log(response)
            })

        } else {
            this.askName()
        }
    }
    

    render() {
        return(
            <Grid>

              <h1>Welcome! You are in Meeting:</h1>
              <h2>{ this.props.match.params.meetingId }</h2>
              
              <Row>
                  <Col md={3}>
                    <div><h1>Meeting Agenda: </h1> </div>
                    </Col>

                    <Col md={9}>
                    
                        { this.state.meeting.agenda }
                        
                    </Col>
              </Row>
              <Row>
                  <Col md={3}>
                    <h1><div>Criteria:  </div></h1>
                   </Col>
                   <Col md={9}>
                   
                        { this.state.meeting.criteria }             
                   
                   </Col>
              </Row>
                <Row>
                    <Col md={2}>
                    <h5>Attedndees</h5>
                        <div className="attendees">{this.state.meeting.attendees}</div>
                    </Col>
                    <Col md={10}>
                        <Chat />
                    </Col>
              </Row>
                <div>{localStorage.getItem('user')}</div>
              

              
                
        
            </Grid>
        )
    }
}