import React,{ useEffect, useState } from 'react'
import RestaurantCard from './restaurantCard'
import {Topic} from '../../popup/topics'
import {Address} from '../../popup/Address/address'
import {Button, Box, FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import {AddressData,AddressAPI} from '../../utils/api/address/addressIndex'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import {RestaurantCardState} from './restaurantCardState'

const RestaurantPopup: React.FC<{
  topic: Topic
  coord: AddressData
}> = ({ topic, coord}) => {
  const [radius, setRadius] = useState<string>("1500")
  const [type,setType] = useState<string>("bakery")
  let restaurantApi = new RestaurantAPI()
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRadius(event.target.value as string);
  }

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  }

  const getData = () => {
    if (coord !== undefined && coord.results.length !== 0) {
      restaurantApi.fetchData(coord, radius, type)
        .then((data) => {
          setNearbySearchData(data)
          setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
      }
  }

  console.log("6")

  return (
    <div>
    {console.log("8")}
      {topic == Topic.Restaurant &&
        <Box>
          <FormControl required className={classes.formControl}>
              <InputLabel id="demo-simple-select-required-label">Radius</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={radius}
                onChange={(handleChange)}
              >
                {[500,1000,1500].map((val, index) => (
                  <MenuItem key={index} value={val}>{val}</MenuItem>
                ))}

              </Select>
              <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
              <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={type}
                onChange={(handleChange2)}
              >
              {["bakery", "cafe", "restaurant", "meal_delivery", "meal_takeaway"].map((val, index) => (
                <MenuItem key={index} value={val}>{val}</MenuItem>
              ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
          </FormControl>
          {radius === "" || type === ""? <Button variant="contained" disabled>Disabled </Button>:<Button variant="contained" color="primary" onClick={(getData)}>Apply</Button> }
         <RestaurantCard coord={coord} initNearbyData={nearbySearchData} initCardState={cardState} />
       </Box>
      }
    </div>
  )
}

export default RestaurantPopup
// FILTER: LANGUAGE
// FILTER: MIN PRICE
// FILTER: MAX PRICE
// FILTER: OPEN NOW
// FILTER: RADIUS
// FILTER: RANK BY
// FILTER: TYPE
