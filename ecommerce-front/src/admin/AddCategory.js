import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

const AddCategory = () => {
    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const {user,token} = isAuthenticated()

    const handleChange = (e) => {
        setError('');
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false)
        createCategory(user._id,token,{name})
        .then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setError("");
                setSuccess(true)
            }
        })
    }

    const newCategoryForm = () => (
        <div>
            <h2 className="text-secondary text-sm-center">Add New Category</h2>
            <form onSubmit={clickSubmit}>
                <div className="form-group mt-4">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                    />
                </div>
                <button className="btn btn-outline-primary">Create Category</button>
            </form>
        </div>
    )

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    const showSuccess = () => {
        if(success) {
            return (
                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {`${name} is created!`}
                    </Alert>
                </Snackbar>
            )
        }
    }

    const showError = () => {
        if(error) {
            return (
                <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error">
                        {`${name} already exist`}
                    </Alert>
                </Snackbar>
            )
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard </Link>
        </div>
    )

    return(
        <Layout title="Add a new category" description={`G'day ${user.name}, Ready to add category `} className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default AddCategory
