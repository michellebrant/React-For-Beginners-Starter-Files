import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';



class App extends React.Component {
  constructor(){
    super();
    //getinitalState
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
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

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });

  }

removeFish(key){
  const fishes = {...this.state.fishes};
  //can't just do delete fishes because of firebase so do:
  fishes[key] = null;
  this.setState({ fishes });

}

//this is a special one we didnt maek up name:
//this saves backend data for us!
  componentWillMount(){
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
          context: this,
          state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef){
      //update app component state
      this.setState({
          order: JSON.parse(localStorageRef)

      })

    }

  }
//this prevents from data loading in diff sites
  componentWillUnmount(){
      base.removeBinding(this.ref);

  }

//this saves local user data (like their order)
//kind of like a cookie
  componentWillUpdate(nextProps, nextState){
    //this runs right before the app is rendered!!
    //cannot store object in local storage, needs to be a string!
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
//check if there is any order in localStorage:

  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }

addToOrder(key){
  //take a copy of our state duh
  const order={...this.state.order};
  //update or add new number of fish ordered
  order[key] = order[key] + 1 || 1;
  //add one if you have one or just add one if there is none
  //finally set state
  this.setState({ order: order });

}

removeOrder(key){
  const order = {...this.state.order};
  delete order[key]
  this.setState({ order })

}



  render(){
    return(
      <div className='catch-of-the-day'>
      <div className="menu">
      <Header age="5000" tagline="Fresh Seafood Market"/>
      <ul className='list-of-fishes'>
      {
        Object.keys(this.state.fishes)
        //we do not use key. key = is for react
        //so we set new variable index to key for us to use!
        .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
        //arrow function returns the component
      }
      </ul>
      </div>
      <Order
      fishes={this.state.fishes}
      order={this.state.order}
      params={this.props.params}
      removeOrder={this.removeOrder} />
      <Inventory fishes={this.state.fishes} addFish={this.addFish}
      loadSamples={this.loadSamples}
      updateFish={this.updateFish}
      removeFish={this.removeFish}
      storeId={this.props.params.storeId} />
      </div>

      )
  }

}

App.propTypes ={
  params: React.PropTypes.object.isRequired

}


export default App;
