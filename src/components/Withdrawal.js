import React, { Component, Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import { sleep } from '../utils/sleep';
class Withdrawal extends Component {
    amount = ''
    setAmount = (amount)=>{
        this.amount=amount
    }
    componentDidMount() {
        this.listenToAmountToWithdraw()
    }
    listenToAmountToWithdraw=async ()=>{
        const { robot, next, setType } = this.props;
        try {
            await robot.say("Say the amount to withdraw")
            let text = await robot.listen();
            this.setAmount(text)
            await sleep(1000)
            next()
    
        } catch (error) {
            console.error(error)
            await robot.say(error);
            this.listenToAmountToWithdraw()
        }
    }
    render() {
        const { robot, next } = this.props;

        return (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', height: '100%' }}>
                <h1 style={{ color: 'blue', textAlign: 'center' }}>Enter Amount</h1>
                <form onSubmit={next} style={{ textAlign: 'center' }}>
                    <FormControl margin="normal" required fullWidth style={{ border: '3px solid blue' }}>
                        <Input type='number'  name="amount" autoFocus onChange={(e)=>{  this.setAmount(e.target.value)   }} value={this.amount} />
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default withRouter(inject('robot')(
    observer(decorate(Withdrawal, {
        amount: observable,
        setAmount: action,
        password: observable,
        setPassword: action
    }))
));