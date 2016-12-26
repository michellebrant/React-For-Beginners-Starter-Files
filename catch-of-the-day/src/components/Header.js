import React from 'react';
//this.props.tagline is how we insert variables in jsx
class Header extends React.Component {
  render(){
    return(
   <header className="top">
   <h1>Catch of the day</h1>
   <h5 className="tagline">{this.props.tagline}</h5>


   </header>
      )
  }

}

export default Header;
