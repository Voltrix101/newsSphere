import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
    };
  }
  async componentDidMount(){
    console.log("cdm");
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=ec21c8d849e741af8a0967e21ed84d5b";
    let data=await fetch(url);
    let parsedData=await data.json(data);
    console.log(parsedData);
    this.setState({articles:parsedData.articles})
  }
  render() {
    return (
      <div className="container my-3">
        <h1>NewsSphere-Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  key={element.url}
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsUrl= {element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container">
        <button type="button" class="btn btn-outline-dark">Previous</button>
        <button type="button" class="btn btn-outline-dark">Next</button>
        </div>
      </div>
    );
  }
}

export default News;
