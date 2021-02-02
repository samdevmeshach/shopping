import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const Profile = () => {
    return (
        <Layout title="Dashboard" description="User Dashboard" className="container-fluid mt-5">
            <div className="row">
                <h2>Helo</h2>
            </div>



        </Layout>
    )
}

export default Profile