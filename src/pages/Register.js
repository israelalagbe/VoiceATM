import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import LazyImage from '../components/LazyImage'
import Base64Helper  from '../utils/Base64Helper';
class Register extends Component {
    state={base64:null}
    async register(e) {
        e.preventDefault()
        const { authStore } = this.props;
        if(!authStore.imageUri){
            alert("You must upload an image")
            return;
        }
        try {
            await authStore.register()
            alert("Registration complete")
        } catch (error) {
            alert("Error register")
        }
        
    }
    async preview(e){
        const { authStore } = this.props;
        let file=e.target.files.item(0)
        let base64=await Base64Helper.readBase64(file)
        this.setState({base64})
        authStore.setImageUri(file)
    }
    pickImage(){
        this.ref.click()
    }
    render() {
        const { classes, authStore } = this.props;
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography style={{ display: 'inline-block' }} component="h1" variant="h5">
                        Register
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Fill in your details to register
                    </Typography>
                    <form onSubmit={this.register.bind(this)} className={classes.form}>
                        <Grid container spacing={24}>

                            <FormControl  onClick={this.pickImage.bind(this)} margin="normal" required style={{display:'flex',margin:'auto',marginTop:'10px',borderRadius:'10px'}}>
                                <LazyImage src={this.state.base64} placeholder='images/avatar.jpg' style={{borderRadius:'5px',width:'88px',height:'88px'}} className='toachable-opacity' />
                                <input accept="image/*" onChange={this.preview.bind(this)} ref={(ref)=>{this.ref=ref;}} type="file" style={{display: 'none'}} name="image" />
                            </FormControl>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        authStore.setName(e.target.value)
                                    }}
                                    value={authStore.name}
                                    required
                                    name="fullname"
                                    label="Full Name"
                                    fullWidth
                                    autoComplete="fullname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        authStore.setEmail(e.target.value)
                                    }}
                                    value={authStore.email}
                                    type='email'
                                    required
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        authStore.setUsername(e.target.value)
                                    }}
                                    value={authStore.username}
                                    type='text'
                                    required
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => {
                                        authStore.setPassword(e.target.value)
                                    }}
                                    value={authStore.password}
                                    type='password'
                                    required
                                    name="password"
                                    label="Password"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField

                                    onChange={(e) => {
                                        authStore.setConfirmPassword(e.target.value)
                                    }}
                                    error={authStore.confirm_password !== authStore.password}
                                    helperText={authStore.confirm_password !== authStore.password ? "Password does not match!" : null}
                                    value={authStore.confirm_password}
                                    type='password'
                                    required
                                    name="confirm_password"
                                    label="Confirm Password"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl margin="normal" required fullWidth>
                                <Button
                                    disabled={authStore.loading || authStore.detailsValid}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.register.bind(this)}
                                >Register {authStore.loading && <CircularProgress size={24} className={classes.buttonProgress} />}</Button>
                            </FormControl>
                        </Grid>
                    </form>
                </Paper>
            </main>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
};
const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
    avatar: {
        display: 'flex',
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    buttonProgress: {
        color: blue[900],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
export default withStyles(styles)(
    inject('authStore')(
        observer(Register)
    )
);