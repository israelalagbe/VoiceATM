import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

class Header extends Component {
    state = {
        anchorEl: null,
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
      };
    render() {
        const { classes, authStore } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" color="primary">
                    <Toolbar>
                        <Typography className={classes.grow} variant="h6" color="inherit">
                            Motivation Network
          </Typography>
                        <div>
                            <IconButton
                                aria-owns={true ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu.bind(this)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={() => { }}>Profile</MenuItem>
                                <MenuItem onClick={() => { authStore.logout() }}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired,
};
export default withStyles(styles)(
    inject('authStore')(
        observer(Header)
    )
);
