import React from 'react'
import {Link} from 'react-router-dom'
import streamGraph from '../../scripts/d3/home'
import {makeDataRequest, getAllOfTable} from '../../scripts/api'
import jump from 'jump.js'
import moment from 'moment'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {entries: []}
  }

  componentDidMount() {
    makeDataRequest(streamGraph)
    getAllOfTable('entry', (entries) => this.setState({entries}))
  }

  scrollToEntries(e) {
    jump('.entries-list', {
      offset: -16
    })
  }

  displayEntries(entries) {
    console.log(entries)
    return entries.map((entry) => {
      return (
        <div key={entry.id} className="row">
            <div className="twelve columns">
              <button className="u-full-width" id={`entry-${entry.id}`}>
                { entry.title ? entry.title : moment(`${entry.created_at} +0000`, "YYYY-MM-DD kk:mm:ss ZZ").local().format("Do MMM YYYY") }
              </button>
            </div>
        </div>
      )
    })
  }

  render() {
    let entriesList = this.displayEntries(this.state.entries)
    return (
      <div>
        <div className="row" id="svgContainer">
          <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 960 500"></svg>
        </div>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <h2 className="downArrow"><img src="images/arrow-down.png" width="70px"  onClick={(e) => this.scrollToEntries(e)}/></h2>
            </div>
          </div>
          <div className="entries-list">
            {entriesList}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
