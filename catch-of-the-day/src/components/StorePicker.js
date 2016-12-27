import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    // clunky way to do this
    // return React.createElement('p', {clsasName:'testing'}, 'i love you')

    //heres jsx!
    //need the className
    //jsX  - can only return ONE parent element
    //cannot put a paragraph under the form here - needs to be seperate return
    //tags need to be self closing!


    return (
        <form className="store-selector">
      {/* THIS IS THE ONLY WAY TO COMMENT IN JSX ITS ANNOYING also CANNOT be on top - can't be the first thing in the jsx*/}
        <h2>Please enter a store</h2>
        <input type='text' required placeholder='Store Name' defaultValue={getFunName()}/>
        <button type="submit">Visit store</button>

        </form>
      )
  }
}

export default StorePicker;
