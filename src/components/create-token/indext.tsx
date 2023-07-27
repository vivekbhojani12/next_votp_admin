import React from 'react'

export default function Createtoken() {
    return (

        <div className="main-panel">
            <div className="content">
                <div className="container-fluid">
                    <h4 className="page-title">Create Token</h4>
                    <div className="card">
                        <div className="row p-3">
                            <div className="col-md-3 col-12">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="name" className="form-control" id="name" placeholder="Enter Full Name" />
                                </div>
                            </div>
                            <div className="col-md-3 col-12">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                                    <small id="emailHelp" className="form-text text-muted">This Email will be use for user search</small>
                                </div>
                            </div>
                            <div className="col-md-1 col-12">
                                <div className="form-group">
                                    <label htmlFor="noids">No Id's</label>
                                    <input type="name" className="form-control" id="noids" placeholder="ID's" />
                                </div>
                            </div>
                            <div className="col-md-3 col-12">
                                <button className="btn btn-success token_gn">Generate Token</button>
                            </div>
                        </div>
                    </div>

                    <div className="card token_gn_details">
                        <div className="row">
                            <div className="col-12">
                                <h4>Token Details:</h4>
                            </div>
                            <div className="col-12">
                                <table className="table table-striped mt-3">

                                    <tbody>
                                        <tr>
                                            <td className="td1">Name</td>
                                            <td>User Name</td>
                                        </tr>
                                        <tr>
                                            <td className="td1">App Token</td>
                                            <td>D787D7</td>
                                        </tr>
                                        <tr>
                                            <td className="td1">Login Captcha Token</td>
                                            <td>57584FF8</td>
                                        </tr>
                                        <tr>
                                            <td className="td1">Email Address</td>
                                            <td>test@test.com</td>
                                        </tr>
                                        <tr>
                                            <td className="td1"> Account Expiry Date</td>
                                            <td>28-May-2023</td>
                                        </tr>
                                        <tr>
                                            <td className="td1">ID's</td>
                                            <td>10</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div className="text-right">
                                    <a href="index.html" className="btn btn-success">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
