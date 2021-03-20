import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 275,
        height:450,
        backgroundColor:"#1a508b",
        margin: 'auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    media: {
        height: 300,
        width: '80%',
        display:"flex",
        justifyContent:"center"
    },
    title: {
        fontSize: 14,
        color:"whitesmoke !important"
    },
    pos: {
        marginBottom: 12,
    },
});

const SimpleCard=(props)=> {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    style={{
                        height: 300,
                        width: '100%',
                        objectFit: 'cover'
                    }}
                    image={props.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{
                        color:"whitesmoke"
                    }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}

export default SimpleCard;
