import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route,Link, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import ListFdTimeTemplate from "./components/ListHotel";
import ListFdCustIdentType from "./components/ListRecall";
import ListTimeInterval from "./components/ListUser";
import ListMenu from "./components/ListMenu";
import Toolbox from "./components/ToolBox";


class SearchLayout extends React.Component{
    render() {
        return (
            <div className="search">
                <header className="search-header"/>
                <div className="results">
                    {this.props.children}
                </div>
                <div className="search-footer pagination"/>
            </div>

        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: null
        };
    }

    render() {
        return (
            <section>
                <div className="container-fluid">
                    <Router>
                        <Route path="/">
                            <div className="row">
                            <Route component={ListMenu}/>
                            <Route component={SearchLayout}>
                                <Route path="/user">
                                    <ListUser />
                                </Route>
                                <Route path="/hotel">
                                    <ListHotel />
                                </Route>
                                <Route path="/recall" >
                                    <ListRecall/>
                                </Route>
                            </Route>
                            </div>
                        </Route>
                    </Router>
                </div>
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));