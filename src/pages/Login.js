import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';
import blue from '@material-ui/core/colors/blue';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'flex',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        display: 'flex',
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
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
class Login extends Component {
    async login(e) {
        e.preventDefault();
        const { authStore } = this.props;
        try {
            /* authStore.setUsername("israelalagbe53@gmail.com")
            authStore.setPassword("pass") */
            await authStore.login()
        }
        catch (e) {
            console.log(e)
            if (e && e.message)
                alert(e.message)
            else {

                alert("Network unreachable, a unknown error occured, please check your network connecttion")

                //alert("Network unreachable, please check your network connecttion")
            }
        }

    }
    render() {
        const { classes, authStore } = this.props;
        return (
            <main className={classes.main}>
                
                <Paper className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography style={{ display: 'inline-block' }} component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.login.bind(this)} className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input onChange={(e) => { authStore.setUsername(e.target.value) }} id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input onChange={(e) => { authStore.setPassword(e.target.value) }} name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            disabled={authStore.loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}

                        >Sign in {authStore.loading && <CircularProgress size={24} className={classes.buttonProgress} />}</Button>
                       <div style={{margin:'10px'}}>
                            Don't have an account <Link color='primary' title='Register' to='/auth/register' > Register </Link>
                        </div>
                    </form>
                </Paper>
            </main>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
};
export default withStyles(styles)(
    inject('authStore')(
        observer(Login)
    )
);