import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './LoginPage.css'
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../Constants';
import { LoginContext } from '../../contexts/LoginContext';
import login from '../../images/login.svg';

function LoginPage(props) {
    let history = useHistory();

    const {
        loggedInUser,
        isLoggedIn,
        setLoginUserDetails,
        logoutUser } = useContext(LoginContext);

    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(setLoginUserDetails);
        console.log(isLoggedIn);


    }, [])

    const changeUserId = (e) => {

        setUserId(e.target.value)

    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const verifyLogin = async (e) => {

        e.preventDefault();
        console.log(userId, " /", password);

        let loginDetail = {
            userId: userId,
            password: password
        }

        await axios.post(API_URL + 'ccuser/login', loginDetail)
            .then(response => {
                console.log(response);
                setUserId('');
                setPassword('');
                // updating the login context
                setLoginUserDetails(response.data.body)
                // navigating to the homepage after login
                history.push('/rewards');

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('error', error.message);

                }
                setUserId('');
                setPassword('');

            })

    }


    
    return (
        <div className="login-page">
            <div className='login-img'>
                <img src={login} width="400em" height="500em"></img>
            </div> 

            <div className="login-form">
            <div className="login-head">Welcome to SmartBank Credit card </div>
            <div class="login-msg">
                <span>Login In to SmartBank Credit Card Portal.</span>
            </div>
            <form onSubmit={verifyLogin} class="g-login">
                <div>
                    <input type="text" value={userId} class="gr-text" required  onChange={changeUserId} placeholder="Enter UserID" size="34"/>
                </div>

                <div>
                    <input type="password" value={password} class="gr-text" required onChange={changePassword} placeholder="Enter Password" size="34"/>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </div>

            </form>
            </div>
        </div>
    );
}

export default LoginPage;



/**
 * The below part is for redux
 */

// const mapStateToProps = state => {

//     return {
//         loginDetail : state
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         login: (user) => dispatch(LogInActionDispatch(user)),
//         logout: () => dispatch(LogOutAction())
//     }
// }
// export default connect(
//  mapStateToProps,
//  mapDispatchToProps
// )(LoginPage);