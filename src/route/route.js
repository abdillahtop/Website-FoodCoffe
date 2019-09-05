import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import store from '../public/redux/store'

import Home from '../screens/home'
import Login from '../screens/login'


export default class link extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/Home' component={Home} />
                </Router>
            </Provider>

        )
    }
}