import React, { Component, Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
class SelectAccountType extends Component {
    password = ""
    componentDidMount() {
        
    }

    render() {
        const { robot, next } = this.props;

        return (
            <div style={{ height: '100%' }}>
                <h1 style={{ color: 'blue', textAlign: 'center' }}>Select your account type</h1>
                <div style={{ float:'right', marginRight: 20}}>
                    <br />
                    <br />
                     <br />
                     <br />
                    <Button size="large" variant="contained" color="primary" onClick={next}>Current</Button>
                    <br />
                    <br />
                    

                    <Button size="large" variant="contained" color="primary" onClick={next}>Savings</Button>

                </div>
            </div>
        );
    }
}

export default withRouter(inject('robot')(
    observer(decorate(SelectAccountType, {
        step: observable,
        setStep: action,
        password: observable,
        setPassword: action
    }))
));