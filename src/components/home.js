import React from 'react'
import "./style.css"

import {
    GoogleMap,
    Marker,
    Autocomplete,
    useJsApiLoader,
    DirectionsRenderer,
    
  } from "@react-google-maps/api";
  import { useRef, useState } from "react";
  
  const center = { lat: 28.9, lng: 77 };
  

const home = () => {
    const {isLoaded , loadError} = useJsApiLoader({
    
        // PLEASE ADD YOUR OWN GOOGLE API KEY
    
        googleMapsApiKey:"AIzaSyAnhWtN-vOu93BESP46SOqNWSkuvdFqi5E",
        libraries:['places']
      })
      // AIzaSyDgkXjaHoQZLVdGAFiqw79AKedVJ_mFq9Q
    
       const [distance, setDistance] = useState('')
       const [directionsResponse,setDirectionsResponse]=useState(null)
       const originRef=useRef()
       const destinationref=useRef()
    
       if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
      }
    
    
       if(!isLoaded){
        return(<div>PLEASE ADD YOUR OWN API KEY</div>)
       }
    
       async function calculateRoute(){
        if(originRef.current.value===''||destinationref.current.value==='')
           return    
         
           // eslint-disable-next-line no-undef
       const directionService=new window.google.maps.DirectionsService()
       // eslint-disable-next-line no-undef
       const results=await direction({
             origin:originRef.current.value ,
             destination:destinationref.current.value,
             // eslint-disable-next-line no-undef
             travelMode:google.maps.TravelMode.DRIVING
       })
      // eslint-disable-next-line no-undef
       setDirectionsResponse(results)
       setDistance(results.routes[0].legs[0].distance.text)
    
       }
    return (
        <>
            <div className='main'>
                <div className='graviti'>
                    {/* <div className='graviti-logo'>
                
                </div> */}
                    <img src="images/logo.png" alt="" />
                </div>
                <div className='distance-heading'>
                    <p>Let's calculate <b>distance</b>  from Google maps</p>
                </div>
                <div className='distance-box'>
                    <div className='distance-form'>
                        <div>
                            <p id='origin-text'>Origin</p>
                            <Autocomplete>
                            <input type="text" className='origin' placeholder=' Delhi' />
                            </Autocomplete>
                            <div className='button'>
                                <button id='calculate'>
                                    Calculate
                                </button>
                            </div>
                            <p id='destination-text'>Destination</p>
                            <Autocomplete>
                            <input type="text" className='destination' placeholder='Mumbai'/>
                            </Autocomplete>
                        </div>
                        <div className='output'>
                            <div className='distance-output'>
                                <span id='distance-text'>
                                    <b>Distance</b>
                                </span>
                                <span id='distance'>
                                    <b>{distance}</b>
                                                  </span>
                            </div>
                            <div className='distance-line'>
                                <p>The distance between <b>Mumbai</b>  and <b>Delhi</b> is <b>{distance}</b> </p>
                            </div>
                        </div>
                    </div>
                    <div className='map-image'>
                    <GoogleMap
                center={center}
                zoom={12}
                mapContainerStyle={{ width: "80%", height: "80%" }}
              >
                <Marker position={center}  />
                {directionsResponse && <DirectionsRenderer/>}
              </GoogleMap>
                    </div>
                </div>
            </div>
        </>
    )
}

export default home
