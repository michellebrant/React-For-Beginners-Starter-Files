import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
class App extends React.Component {
  constructor(){
    super();
    //getinitalState
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    //^that binds it to the app itself!
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish){
    //update our state
    //when you wanna update state, theres a couple things we need to do
    //best practice is to copy your current state & update it
    const fishes = {...this.state.fishes};
    //wtf is this?
    //this.state.fishes is our existing fishes state
    //... is a spread - will take every item from our object
    //and spread it into this object. long way of saying it takes a copy (lol)
    //add in our new fish - we are using time stamps because incremental and unique:
    const timestamp = Date.now();
    fishes['fish-'+timestamp] = fish;
    //so that^ created it but didnt set it!
    //set state, specifically tell react which state to update!
    //like this:
    this.setState({ fishes: fishes })
    //^fishes has been udpated with this variables = fishes!
    //THIS IS THE VIRTUAL DOM! you're not actually update the dom - get it?

  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }


  render(){
    return(
      <div className='catch-of-the-day'>
      <div className="menu">
      <Header age="5000" tagline="Fresh Seafood Market"/>

      </div>
      <Order />
      <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>

      )
  }

}

export default App;
