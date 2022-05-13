import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = ({
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0

        })
        document.title = `${this.capitalize(this.props.category)} - Sara News`;
    }

    async updateNews() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
        console.log(parsedData);
        
    }

    async componentDidMount() {
        this.updateNews();

    }

    // handlePrevClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews()
    // }

    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
        console.log(this.state.page);
        
        
        
    }


    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '20px 0px' }}>Sara News - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    // loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element, index) => {
                                return <div className="col-md-4 my-2" key={index}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : 'Title not given'} description={element.description ? element.description.slice(0, 80) : 'Description not given'} imgUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} source={element.source.name}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.state.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
