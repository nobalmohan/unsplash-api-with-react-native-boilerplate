/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "{YOUR_APP_ID}",
  secret: "{YOUR_SECRET_ID}",
  callbackUrl: "{YOUR_CALLBACK}"
});

const formStyle = {
  padding: '4% 0%'
};

const imgStyle = {
  padding: '1%'
};

var List = React.createClass({
    render: function() {
        return (<div>
        { this.props.data.map(function(item) {
                return <div>{item}</div>
            })
        }
        </div>);
    }
});

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchlist: [],
      page: 1,
      total_pages: [1,2,3,4,5],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
     this.getSearchData().then((res) => {
       console.log(res);
       this.setState({
         searchlist: res.results,
         total_page: res.total_pages
      });
    })
     event.preventDefault();
   }

   handleChange(event) {
     this.setState({value: event.target.value});
   }

   handlePage(page) {
     console.log(page);
     this.state.page = page;
     this.getSearchData().then((res) => {
       console.log(res);
       this.setState({
         searchlist: res.results,
         total_page: res.total_pages
      });
    })
   }

  getSearchData() {
    console.log(this.state.page);
    var getPayload = {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID YOUR_APP_ID'
      }
    };

    var url = `https://api.unsplash.com/search/photos?page=`+ this.state.page +`&per_page=10&query=`+ this.state.value;
    console.log(url);
    return fetch(url, getPayload)
          .then((response) => response.json() )
          .then((responseData) => responseData)
          .catch(function (err) {
            return err;
          });
  }

  render() {
    return (
      <Layout>
            <form onSubmit={this.handleSubmit} style={{padding: '2%'}}>
            <label style={{fontSize: 18}}>
              Search:
             <input style={{padding: '10px'}} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
             <input style={{fontSize: 18}} type="submit" value="Search" />
            </form>

            {this.state.searchlist.map((images, i) => {
              return (
                <div key={i} style={{float: 'left',padding: '2%'}}>
                    <img width='100' height='100' src={images.urls.small} />
                </div>
              );
            })}
            <div styles={{ display: 'inline-block'}}>
            {this.state.total_pages.map((page, i) => {
              return (
                 <span key={i} style={{fontSize: 18, padding: 20, cursor: 'pointer',color: 'blue'}} onClick={() => this.handlePage(i+1)}>{i+1}</span>
              );
            })}
            </div>

      </Layout>
    );
  }

}

export default HomePage;
