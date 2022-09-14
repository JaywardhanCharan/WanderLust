import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';   //useMediaQuery helps in making the app mobile responsive
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import  Rating  from '@material-ui/lab/Rating';

import useStyles from './styles';
import image from '../Place Details/images/restaurant-interior.jpg';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) =>{
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)'); //isDesktop would be set to false if the width of the device is larger than 600px

    // const coordinates = {lat: 0, lng: 0};

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyBaJRS3k2XNuHWlk-to7sE8sgLrTB2JbXw'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) =>{
                    console.log(e);
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});   //ne-NorthEast sw-SouthWest
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
            {places?.map((place, i) => (
                <div
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                >
                    {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color='primary' fontSize='large' />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                    {place.name}
                                </Typography>
                                <img 
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : image}
                                    alt={place.name}
                                />
                                <Rating size='small' value={Number(place.rating)} readOnly />
                            </Paper>
                        )
                    }
                </div>
            ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;