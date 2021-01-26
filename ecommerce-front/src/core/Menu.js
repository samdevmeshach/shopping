import React, { Fragment } from 'react'
import{Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth'
import {totalItem} from './cartHelper'

const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return {color :'#ff9900'}
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-secondary">
                <div className="navbar-brand" href="#">
                    <img src="" width="30" height="30"
                         className="d-inline-block align-top" alt="" />
                    Meena Store
                </div>
                <li className="nav-items">
                    <Link className="nav-link" style={isActive(history,"/")} to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" style={isActive(history,"/shop")} to="/shop">
                        Shop
                    </Link>
                </li>
                <li className="nav-items">
                    <Link className="nav-link" style={isActive(history,"/cart")} to="/cart">
                        Cart <sup><small className="cart-badge">{totalItem()}</small></sup>
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0  &&(
                    <li className="nav-items">
                        <Link className="nav-link" style={isActive(history,"/user/dashboard")} to="/user/dashboard"> Dashboard </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 &&(
                    <li className="nav-items">
                        <Link className="nav-link" style={isActive(history,"/admin/dashboard")} to="/admin/dashboard"> Dashboard </Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-items">
                            <Link className="nav-link" style={isActive(history,"/signin")} to="/signin"> Signin </Link>
                        </li>
                        <li className="nav-items">
                            <Link className="nav-link" style={isActive(history,"/signup")} to="/signup"> Signup </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-items">
                        <span className="nav-link" style={{cursor:"pointer",color:"#ffffff"}}
                            onClick={() => signout(() => {
                                history.push('/')
                            })}>
                                Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)

