import React,{useState} from 'react'
import Layout from '../core/Layout'
import {signin,authenticate,isAuthenticated} from '../auth'
import { Redirect } from 'react-router-dom'

const Signin = () => {

        const [values,setValues] = useState({
            email:'sa@gmail.com',
            password:'sa@123',
            error:'',
            loading:false,
            redirectToreferrer:false,
            showPassword:false
        })
    
        const {email,password,error,loading,redirectToreferrer,showPassword} = values;
        const {user} = isAuthenticated()
    
        const handleChange = name => event => {
            setValues({...values,error:false,[name]:event.target.value})
        }
    
        const toogle = (event) => {
            event.preventDefault();
            setValues({...values,showPassword:!showPassword})
        }
    
        const clickSubmit = (event) => {
            event.preventDefault();
            setValues({...values,error:false,loading:true})
            signin({email,password})
            .then(data => {
                if(data.error){
                    setValues({...values,error:data.error,loading:false})
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToreferrer:true
                        })
                    })
                }
            })
        }


        const showLoading = () => (
            loading && (<div className="alert alert-info">
                <h4>Loading...</h4>
            </div>)
        )

        const signinError = () => (
            <div className="alert alert-danger" style={{display:error ? "" : 'none'}}>
                {error}
            </div>
        )

        const redirectUser = () => {
            if(redirectToreferrer){
                if(user.role === 1){
                    return <Redirect to="/admin/dashboard" />
                }
                else{
                    return <Redirect to="/user/dashboard" />
                }
            }
            if(isAuthenticated()){
                return <Redirect to="/" />
            }
        }

        const signInForm = () => (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange("email")} type="text" className="form-control" value={email} />
                </div>
                <div className="form-group">
                    
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange("password")} type={showPassword ? 'text' : 'password'} className="form-control pwd" value={password} />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary mr-2">Submit</button>
                <button onClick={toogle} className="btn btn-primary">{showPassword ? "Hide" : "Show Password"} </button>
            </form>  
        )


    return(
        <Layout title="Signin" description="Signin to E-commerce App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {redirectUser()}
            {signinError()}
            {signInForm()}
        </Layout>
    );
}

export default Signin
