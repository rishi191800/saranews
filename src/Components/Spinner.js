import React, { Component } from 'react'
// import loading from './loading1.gif'
// import loading1 from './loading2.gif'
export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <div className="spinner-border text-primary my-3" role="status">
                </div>
            </div>
        )
    }
}

export default Spinner
