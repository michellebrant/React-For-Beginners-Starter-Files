import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

componentDidMount(){
  //event listener basically - when we load page
  //try and authetniaticate automatically!
  base.onAuth((user => {
    if(user){
    this.authHandler(null, { user })
  }
  }))

}


  handleChange(e, key){

    const fish = this.props.fishes[key];

    //take a copy of that fish and update it with the new data
    // const updatedFish = Object.assign({}, fish) one way to take a copy! or:
    const updatedFish = {...fish,
                        [e.target.name]: e.target.value
                        //able to change the thing that changes! from the name property in the values}
  }
  this.props.updateFish(key, updatedFish);
}

authenticate(provider){
  base.authWithOAuthPopup(provider, this.authHandler);
}

logout(){
  base.unauth();
  this.setState({ uid: null})

}

authHandler(err, authData){
  console.log(authData)
  //if error do this
  if (err){
    console.error(err);
    return;
  }

//grab the store info if they have been authenticated so its associated!
  const storeRef = base.database().ref(this.props.storeId);

  //query the firebase once for teh stored data now!:
  storeRef.once('value', (snapshot) => {
    const data = snapshot.val() || {};
    //claim it as our own if theres no owner already:
    if(!data.owner){
      storeRef.set({
        owner: authData.user.uid
      })
    }
//this gives us the inventory and data and shit now that we lgoged in
//makes the page not log in page when succesfful
//makes it your fish page!!!
    this.setState({
      uid: authData.user.uid,
      owner: data.owner || authData.user.uid
    })
  })
}


renderLogin(){
  return(
    <nav className="login">
      <h2>Inventory</h2>
      <p>Sign in to manage your store's inventory</p>
      <button className="github" onClick={() => this.authenticate('github')}>
      Log in with github </button>
       <button className="facebook" onClick={() => this.authenticate('facebook')}>
      Log in with facebook </button>
         <button className="twitter" onClick={() => this.authenticate('twitter')}>
      Log in with twitter </button>
      </nav>

    )


}

  renderInventory(key){
    const fish = this.props.fishes[key];
    return(
        <div className="fish-edit" key={key}>
          <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
          <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
          <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>

          </select>
          <textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)} >
          </textarea>
          <input type="text" name="image"placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)} />
          <button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
        </div>

      )

  }
  render(){
    const logout = <button onClick={() => this.logout()}>log out</button>
    //uid is currently logged in
    //here were checking if someone is logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    //check if they are owner of current store
    if(this.state.uid !== this.state.owner){
      return(
          <div>
          <p>sry u r not the owner</p>
          {logout}
          </div>
        )
    }


    return(
      <div>
    <h2>Inventory</h2>
    {logout}
    {Object.keys(this.props.fishes).map(this.renderInventory)}
    <AddFishForm addFish={this.props.addFish}/>
    <button onClick={this.props.loadSamples}>Load sample fishes</button>
    </div>
      )
  }
}


Inventory.propTypes ={
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired

}

export default Inventory;
