import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import image from './images/restaurant-interior.jpg';


const PlaceDetails = ({place, selected, refProp}) =>{    // Getting ' place' as props
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behaviour: 'smooth', block: 'start'})

    return(
        <Card elevation={6}>
            <CardMedia
                style={{height: 350}}
                image={place.photo ? place.photo.images.large.url : image}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place?.cuisine?.map(({name}) =>(
                    <Chip key={name} size='small' label={name} classname={classes.chip}/>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
                    Website
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;