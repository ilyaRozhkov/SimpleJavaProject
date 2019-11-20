import React from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/main.css';

class ListMenu extends React.Component{
    constructor(props) {
        super(props);
    };

    activateMenuItem(event){
        const selectedMenuItem = event.target.parentNode;
        const menuItems = selectedMenuItem.parentNode.childNodes;

        menuItems.forEach(menuItem => {menuItem.className=""});
        selectedMenuItem.className = "active";
    }

    render() {
        return (
            <div className="col-lg-2 col-md-4 col-4 menu">
                <div className="header-h1 py-2">
                    <h1>Fraud detection module</h1>
                </div>
                <header className="primary-header"/>
                <aside className="primary-aside">
                    <ul className="menu_link">
                        <li><Link onClick={this.activateMenuItem} to="/fd-cust-ident-type">Customer types</Link></li>
                        <li><Link onClick={this.activateMenuItem} to="/fd-time-template">Time templates</Link></li>
                        <li><Link onClick={this.activateMenuItem} to="/time-interval">Time intervals</Link></li>
                    </ul>
                </aside>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default ListMenu;

