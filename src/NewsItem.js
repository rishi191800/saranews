import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, publishedAt, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }}>
                        <span className=" badge rounded-pill bg-danger"> {source}</span>
                    </div>
                    <img src={! imgUrl ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : imgUrl} className="card-img-top" alt="Image not found" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}... <span>Published At : {new Date(publishedAt).toGMTString()}</span></p>
                        <a href={newsUrl} target='_blank' className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem
