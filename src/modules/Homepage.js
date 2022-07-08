import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

function Homepage() {

    const {isLoggedIn , loggedInUser} = useContext(LoginContext)


    const loggedInUserDetails = {
        ccNumber: loggedInUser.ccNumber,
        ccName: loggedInUser.ccName,
        userName: loggedInUser.userName,
        userId: loggedInUser.userId,
        availableRedeemPoints: loggedInUser.availableRedeemPoints,
        totalRewardsGained: loggedInUser.totalRewardsGained
    }
    
    console.log(loggedInUserDetails)

    /**
     * Replace the above login details with details from LoginContext
     * 
     */

    return (
        <div className="homepage container">
            <h2>Welcome to SmartBank credit card</h2>

            <div className="user-detail">

                {
                    isLoggedIn ?
                        (
                            <div>

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Credit Card Number</th>
                                            <th>Card Name</th>
                                            <th>User Name</th>
                                            <th>Available Points</th>
                                            <th>Total Rewards Gained (<i className="fas fa-rupee-sign"></i>)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{loggedInUserDetails.ccNumber}</td>
                                            <td>{loggedInUserDetails.ccName}</td>
                                            <td>{loggedInUserDetails.userName}</td>
                                            <td>{loggedInUserDetails.availableRedeemPoints}</td>
                                            <td>{loggedInUserDetails.totalRewardsGained}</td>
                                        </tr>
                                    </tbody>



                                </table>

                            </div>
                        ) :
                        (
                            <div className="mt-5">
                                Please Sign in to redeem your points. &nbsp; &nbsp;
                                <Link className="btn btn-primary" to="/login">
                                    <i className="fas fa-user" />&nbsp; Sign in

                                </Link>
                            </div>
                        )
                }


            </div>
        </div>
    );
}

export default Homepage; 