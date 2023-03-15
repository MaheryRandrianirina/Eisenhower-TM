import { Component } from "react";

class Navbar extends Component {
    
    render()
    {
        return <nav className="navbar navbar-expand-sm bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand text-light">EISENHOWER</div>
                <div className="d-flex">
                    <input type="search" name="q" className="form_control" id="search_input" onChange={this.props.onChange} value={this.props.value}/>
                    <svg onClick={this.props.onSearchButtonClick} className="text-light m-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </nav>
    }
}

export default Navbar