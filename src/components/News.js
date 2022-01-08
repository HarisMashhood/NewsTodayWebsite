import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  articles = [
    /* {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info",
      },
      author: null,
      "title":
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description":
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage":
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      "content":
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info",
      },
      author: null,
      "title":
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description":
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage":
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      "content":
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },*/
  ];

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    console.log("Hello i am a constructor from news component");
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
    }
    document.title= `${this.props.category} -NewsMonkey`;
  }
  async componentDidMount() {
    //componentDidMount() function is asynchronous funct and will run after render method
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18b643eee59f412c88e3780e43ed5b23&pageSize=${this.props.pageSize}`;
    let data = await fetch(url); //fetch api takes url argument and returns promise await
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handleprevclick = async () => {
    console.log("Prev Click");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18b643eee59f412c88e3780e43ed5b23&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url); //fetch api takes url argument and returns promise await
    let parsedData = await data.json();
    //this.setState({ articles: parsedData.articles });

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handlenextclick = async () => {
    if (this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize)){

    }
    else{
         //math.ceil returns like 4.8->5 , 3.6->4 etc..
      console.log("Next Click");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18b643eee59f412c88e3780e43ed5b23
      &page=${ this.state.page + 1 }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url); //fetch api takes url argument and returns promise await
      let parsedData = await data.json();
      //this.setState({ articles: parsedData.articles });
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
     
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'40px 0px;'}}>NewsCat - Top Headlines</h1>
        {<Spinner/>}
        <h2 className="text-center">{this.props.category} news for you :-)</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgURL={element.urlToImage}  
                  newsURL={element.url} 
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between"> 
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr;Previous
          </button>
          <button
            disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
