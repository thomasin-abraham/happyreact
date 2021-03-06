import {connect} from 'react-redux'

import Home from '../components/Home'

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    login: state.login
  }
}

export default connect(
  mapStateToProps
)(Home)
