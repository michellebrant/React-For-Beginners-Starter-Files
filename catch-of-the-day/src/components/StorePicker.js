import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    //constructor of the component to get this work!
    // constructor() {
    //   super();
    //   this.goToStore = this.goToStore.bind(this);
    // }
      event.preventDefault();
      const storeId = this.storeInput.value;
      console.log(storeId)
    //first grab the text from the box

    //second transition from / to /store/:storID
    this.context.router.transitionTo('/store/' + storeId);
  }
  render() {
    // clunky way to do this
    // return React.createElement('p', {clsasName:'testing'}, 'i love you')

    //heres jsx!
    //need the className
    //jsX  - can only return ONE parent element
    //cannot put a paragraph under the form here - needs to be seperate return
    //tags need to be self closing!


    return (
        <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      {/* THIS IS THE ONLY WAY TO COMMENT IN JSX ITS ANNOYING also CANNOT be on top - can't be the first thing in the jsx*/}
        <h2>Please enter a store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()} ref={(input => {this.storeInput = input})}/>
        <button type="submit">Visit store</button>

        </form>
      )
  }
}

//making the router available in store picker component
StorePicker.contextTypes = {
  router: React.PropTypes.object
}



export default StorePicker;
