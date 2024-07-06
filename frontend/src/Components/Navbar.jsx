import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-dark hw-color">
                <div className="container-fluid">
                        
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        
                    <a className="navbar-brand" href="#">Logo</a>

                    <div className="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header ">
                            <h5 className="offcanvas-title text-center" id="offcanvasDarkNavbarLabel">Logo</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/user/">User</a>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar