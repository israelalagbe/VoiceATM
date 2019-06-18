import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { inject, observer } from 'mobx-react';

class Home extends Component {
    render() {
        const { classes,authStore } = this.props;
        let cards=[1,2,3,4,5,6]
        return (
            <main style={{ marginTop: 20 }}>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={40}>
                      {cards.map(card => (
                        <Grid item key={'card'} sm={6} md={4} lg={4}>
                            <Card className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            <CardMedia
                                                className={classes.avatar}
                                                image={authStore.user&&authStore.user.thumb} // eslint-disable-line max-len
                                                title="Image title"
                                            />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={authStore.user&&authStore.user.name}
                                    subheader="September 14, 2016"
                                />
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={Math.random()>0.5?"http://localhost/motivation_app/public/uploads/inspirational_quotes_motivational.jpg":"http://localhost/motivation_app/public/uploads/Lion-Sheep-Motivation-Quote.jpg"}
                                   title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Morning motivation
                                    </Typography>
                                    <Typography>
                                       {"It's better to live a day as a lion than to live a thousand years as a sheep"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/*  <Button size="small" color="primary">
                                        View
                                    </Button>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                      ))}
                    </Grid>
                </div>
            </main>
        );
    }
}

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    avatar:{
        backgroundSize:'100% 100%',
        width:'40px',
        height:'40px'

    },

    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
};
export default withStyles(styles)(
    inject('authStore')(
        observer(Home)
    )
);