import React, { Component, Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { sleep } from '../utils/sleep';
class SecretNumber extends Component {
    password = ""
    componentDidMount() {
        this.listenToPassword()
        
    }
     listenToPassword=async ()=>{
        const { robot, next } = this.props;
        await robot.say("Please say your secret number")
        try {
            let result=await robot.listen()
            this.setPassword(result)
            sleep(500)
            this.submit()
        } catch (error) {
            await robot.say(error)
            this.listenToPassword()
        }
    }
    submit = async (e) => {
        // eslint-disable-next-line no-unused-expressions
        e && e.preventDefault();
        const { robot, next } = this.props;
        
        if(this.password){
        
            setTimeout(() => {
                next()
            }, 500);
        }
        
        //this.setStep(this.step + 1)
    }
    setPassword = (password) => {
        this.password = password;

    }
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', height: '100%' }}>
                <h1 style={{ color: 'blue', textAlign: 'center' }}>Please say your secret number</h1>
                <form onSubmit={this.submit} style={{ textAlign: 'center' }}>
                    <FormControl margin="normal" required fullWidth style={{ border: '3px solid blue' }}>
                        <Input onChange={(e)=>this.setPassword(e.target.value)} name="email" autoFocus value={this.password} />
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default withRouter(inject('robot')(
    observer(decorate(SecretNumber, {
        step: observable,
        setStep: action,
        password: observable,
        setPassword: action
    }))
));