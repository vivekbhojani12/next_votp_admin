import React from 'react'




export default function Dashboard() {


  return (
    <>
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Dashboard</h4>
            <div className="row">
              <div className="col-md-3">
                <div className="card card-stats card-warning">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-users"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Total Users</p>
                          <h4 className="card-title">2,294</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-success">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-user"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Active Users</p>
                          <h4 className="card-title">1,345</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-danger">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-user-times"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Inactive Users</p>
                          <h4 className="card-title">1303</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-primary">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la la-user-plus"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Upcoming Renews</p>
                          <h4 className="card-title">576</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>


          <div className="container-fluid user_details">
            <div className="row">
              <div className="col-12">
                <h5>Users Details</h5>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="col-md-3 pt-4 ml-auto">
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
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>App Token</th>
                            <th>Captcha Token</th>
                            <th>ID's</th>
                            <th>Expiry Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="/"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Username</td>
                            <td>test@test.com</td>
                            <td>G76D87</td>
                            <td>HGT768GD</td>
                            <td>10</td>
                            <td>28-May-2023 (20 days left)</td>
                            <td><a href="#"><i className="la la-edit"></i></a></td>
                            <td><a href="#"><i className="la la-trash-o"></i></a></td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



