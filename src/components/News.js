import React, {useEffect, useState} from 'react'
import Newsitems from './Newsitems'
import InfiniteScroll from "react-infinite-scroll-component";
import  PropTypes  from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
    const updateNews = async () => {
        const url =`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${props.page}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        setArticles(parsedata.articles);
        settotalResults(parsedata.totalResults);    
    }
    useEffect(() => {
        updateNews()
    },[])

    



    // const handlePreviousClick = async ()=>{
    //     setPage(page-1)
    //     updateNews()
    // }
    // const handleNextClick = async ()=>{
    //     setPage(page+1)
    //     updateNews()
    // }
    
    const fetchMoreData = async  () => {
        setPage(page+1)
        const url =`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${props.page}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        setArticles(articles.concat(parsedata.articles))
        settotalResults(parsedata.totalResults)
      };
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: '40px 0px', marginTop:'100px'}}>News Monkey - Top Headlines of {props.category}</h1>
                <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!== totalResults}
                        >
                <div className="row">
                    {articles.map((element) => {
                        return (<div className="col-md-4 my-2">
                            <Newsitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} url={element.url} />
                        </div>)
                    })}
                  

                </div>
                </InfiniteScroll>


            </div>

        )
    }


News.defaultProps = {
    category : "General",
    // pagesize : "5"
}

News.propTypes = {
        // pagesize : PropTypes.number,
        category: PropTypes.string,
  }

export default News