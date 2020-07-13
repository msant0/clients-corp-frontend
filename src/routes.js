import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Client from './pages/Client'
import NewClient from './pages/NewClient'
import EditClient from './pages/EditClient'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Client} />
                <Route path='/createClient' component={NewClient} />
                <Route path='/editClient' component={EditClient} />
            </Switch>
        </BrowserRouter>
    )
}