// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

//importing the render method from react dom library^

import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () =>{
  return(
    <BrowserRouter>
    <div>
    <Match exactly pattern="/" component={StorePicker} />
    <Match pattern="/store/:storeId" component={App} />
    <Miss component={NotFound} />
    </div>
    </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'))

import './css/style.css';

import App from './components/App'

