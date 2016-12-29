import React from 'react';
//this.props.tagline is how we insert variables in jsx

const Header = (props) => {
    return(
   <header className="top">
   <h1>Catch
   <span className="ofThe">
   <span className="of">of</span>
   <span className="the">the</span>
   </span>
   day</h1>
   <h5 className="tagline"><span>{props.tagline}</span></h5>


   </header>
      )
}


Header.propTypes= {
  tagline: React.PropTypes.string.isRequired
}




export default Header;
