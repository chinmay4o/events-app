import React from 'react'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import FacebookIcon from 'react-share/lib/FacebookIcon';
import LinkedinIcon from 'react-share/lib/LinkedinIcon';
import TwitterIcon from 'react-share/lib/TwitterIcon';
import WhatsappIcon from 'react-share/lib/WhatsappIcon';
const LandingSocialBtn = () => {
  return (
    <>
      <TwitterShareButton 
                url={window.location.href}
                quote={"Warpbay"}
                round={true}
             >
        <TwitterIcon size={50} round={true}/>
        </TwitterShareButton>

        <FacebookShareButton
        url={window.location.href}
                quote={"Warpbay"}
                round={true}>
             
        <FacebookIcon size={50} round={true}/>
        </FacebookShareButton>

        <LinkedinShareButton
        url={window.location.href}
                quote={"Warpbay"}
                round={true}>
             
        <LinkedinIcon size={50} round={true}/>
        </LinkedinShareButton>

        <WhatsappShareButton
        url={window.location.href}
                quote={"Warpbay"}
                round={true}>
             
        <WhatsappIcon size={50} round={true}/>
        </WhatsappShareButton>

    </>
  )
}

export default LandingSocialBtn