import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css"; // Add this line to import the CSS file
const News=(props)=> {
  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${captalizeFirstLetter(props.category)}-NewsSphere`;
  const captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  
  
  const UpdateNews=async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(false);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
     props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${captalizeFirstLetter(props.category)}-NewsSphere`;
    UpdateNews();
    // eslint-disable-next-line
  },[])
  
 
const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95b5c5b5306945b796879cdd4d731b08&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"90px" }}>
          NewsSphere-Top {captalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

 News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    darkMode: false, // Add this line to set the default value of darkMode to false
  };;
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  

export default News;
