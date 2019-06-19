import React, { Component, Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
class SelectTransaction extends Component {
    password = ""
    componentDidMount() {
        this.listenToTransactionType()
    }
     listenToTransactionType=async ()=>{
        const { robot, next, setType } = this.props;
        await robot.say("Select a transaction")
        try {
            let text=await robot.listen()
            if(text.toLowerCase()==="withdrawal"){
                setType(text.toLowerCase());
                next()
            }
            else{
                await robot.say("Can't understand your option");
                setTimeout(this.listenToTransactionType, 0);
            }
        } catch (error) {
            await robot.say(error)
            this.listenToTransactionType()
        }
    }
    buttonClick=(e)=>{
        const { setType,next } = this.props;
        setType(e.target.textContent);
        next()
    }
    render() {
        const rowStyle={display: 'flex', 'justifyContent': 'space-around'};
        return (
            <div style={{ height: '100%' }}>
                <h1 style={{ color: 'blue', textAlign: 'center' }}>Select a transaction</h1>
                <div style={ {display: 'flex',flexDirection: 'column',height: 'calc(100% - 100px)', justifyContent: 'space-around'}}>
                    <div style={rowStyle}>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Transfer</Button>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Withdrawal</Button>
                    </div>
                    <div style={rowStyle}>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Balance</Button>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Pay Bills</Button>
                    </div>
                    <div style={rowStyle}>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Change Pin</Button>
                        <Button size="large" variant="contained" color="primary" onClick={this.buttonClick}>Exit</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(inject('robot')(
    observer(decorate(SelectTransaction, {
        step: observable,
        setStep: action,
        password: observable,
        setPassword: action
    }))
));