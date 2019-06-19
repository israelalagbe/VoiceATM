import React, { Component } from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import { Robot } from './utils/Robot';
import SecretNumber from './components/SecretNumber';
import { observer, inject } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { HashRouter, withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import SelectTransaction from './components/SelectTransaction';
import SelectAccountType from './components/SelectAccountType';
import Withdrawal from './components/Withdrawal';
import TakeCash from './components/TakeCash';
import alertify from 'alertifyjs';

class App extends Component {
  step = '';
  type=null;
  setStep = (step) => {
    this.step = step;
  }
  nextStep = (step) => {
    this.setStep(this.step + 1);
  }
  setType = (type) => {
    this.type=type;
  }
  showPincode = () => {
    this.setStep("pincode");
  }
  showSelectTransaction = async () => {
    const { robot } = this.props;
    await robot.say("Please wait while your transaction is processing: ")
    this.setStep("select_transaction");
  }
  showSelectAccountType = () => {
    this.setStep("select_account_type");
    ///balance/i.test('balance')
  }
  showTakeCash = () => {
    this.setStep("take_cash");
  }
  nextAfterAccountType= ()=>{
    this.setStep(this.type.toLowerCase())
  }
  componentDidMount() {
    const { robot } = this.props;
    document.body.click()
    alertify.alert("Click ok to continue", ()=>{
      robot.say("Welcome")
      this.showPincode()
    });
  }
  render() {
    console.log(this.step)
    return (
      <div className="atm">
        <Card className="screen">
          {this.step === 'pincode' ? <SecretNumber next={this.showSelectTransaction} /> : null}
          {this.step === 'select_transaction' ? <SelectTransaction next={this.showSelectAccountType} setType={this.setType} /> : null}
          {this.step === 'select_account_type' ? <SelectAccountType next={this.nextAfterAccountType} /> : null}
          {this.step === 'withdrawal' ? <Withdrawal next={this.showTakeCash} /> : null}
          {this.step === 'take_cash' ? <TakeCash next={this.nextAfterAccountType}  /> : null}
        </Card>
      </div>
    );
  }
}
//
export default
  withRouter(inject('robot')(
    observer(decorate(App, {
      step: observable,
      setStep: action,
      password: observable,
      setPassword: action
    }))
  ));