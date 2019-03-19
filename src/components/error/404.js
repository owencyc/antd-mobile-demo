import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const NotFound = (props) => (
    <div id="not-found">
		<div className="notfound">
			<div className="notfound-404">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>当您看到此页面，可能有两种情况：1、访问的资源不存在；2、当前页面还在施工</p>
			<div className='back' onClick={()=>props.backHome()}>主页</div>
		</div>
	</div>
)

const mapStateToProps = state => {
  //console.log('main inject:');
  //console.log(state);
  return {
    timer: state.error.timer
  }
}
const mapDispatchToProps = dispatch => ({
  backHome: () => { dispatch(push('/main')) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);