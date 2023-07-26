import React from 'react'

export default function createtoken() {
    return (

        <div className="main-header">
            <div className="logo-header">
                <a href="index.html" className="logo">
                    <img src="assets/img/votp.svg" alt="V OTP" />
                </a>
                <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <nav className="navbar navbar-header navbar-expand-lg">
                <div className="container-fluid">

                    <form className="navbar-left navbar-form nav-search mr-md-3" action="">
                        <div className="input-group">
                            <input type="text" placeholder="Search ..." className="form-control" />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="la la-search search-icon"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">


                        <li className="nav-item dropdown">
                            <a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false"> <img src="assets/img/profile.jpg" alt="user-img" width="36" className="img-circle" /><span >Vijay</span></a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <div className="user-box">
                                        <div className="u-img"><img src="assets/img/profile.jpg" alt="user" /></div>
                                        <div className="u-text">
                                            <h4>Vijay</h4>
                                            <p className="text-muted">hello@test.com</p><a href="profile.html" className="btn btn-rounded btn-danger btn-sm">View Profile</a>
                                        </div>
                                    </div>
                                </li>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="ti-user"></i> My Profile</a>
                                <a className="dropdown-item" href="#"><i className="Balance"></i> My Balance</a>
                                <a className="dropdown-item" href="#"><i className="ti-email"></i> Inbox</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="ti-settings"></i> Account Setting</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="fa fa-power-off"></i> Logout</a>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="sidebar">
                <div className="scrollbar-inner sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src="assets/img/profile.jpg" />
                        </div>
                        <div className="info">
                            <a className="" data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                <span>
                                    Vijay
                                    <span className="user-level">Administrator</span>
                                    <span className="caret"></span>
                                </span>
                            </a>
                            <div className="clearfix"></div>

                            <div className="collapse in" id="collapseExample" aria-expanded="true" >
                                <ul className="nav">
                                    <li>
                                        <a href="#profile">
                                            <span className="link-collapse">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#edit">
                                            <span className="link-collapse">Edit Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#settings">
                                            <span className="link-collapse">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li className="nav-item ">
                            <a href="index.html">
                                <i className="la la-dashboard"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a href="create-token.html">
                                <i className="la la-table"></i>
                                <p>Create New Token</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
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


            <div className="modal fade" id="modalUpdate" role="dialog" aria-labelledby="modalUpdatePro" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h6 className="modal-title"><i className="la la-frown-o"></i> Under Development</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Currently the pro version of the <b>Ready Dashboard</b> Bootstrap is in progress development</p>
                            <p>
                                <b>We'll let you know when it's done</b></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
