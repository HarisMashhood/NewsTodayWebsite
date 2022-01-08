import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgURL,newsURL,author, date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        
          <img src={imgURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span class="badge rounded-pill bg-danger" style={{width:"40%"}}>{source}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {date}</small></p>
            <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
