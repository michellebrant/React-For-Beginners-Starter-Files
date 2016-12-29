import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
        </div>

      )

  }
  render(){
    return(
      <div>
    <h2>Inventory</h2>
    {Object.keys(this.props.fishes).map(this.renderInventory)}
    <AddFishForm addFish={this.props.addFish}/>
    <button onClick={this.props.loadSamples}>Load sample fishes</button>
    </div>
      )
  }
}

export default Inventory;
