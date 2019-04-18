import React, { Component } from 'react'
import {CSSTransition} from 'react-transition-group';
import ReactDOM from 'react-dom';
import './test.css';

class Test extends React.Component {
constructor(){
    super()
    this.state={
        showBox:false
    }
}
componentDidMount(){
    this.boxDOM = ReactDOM.findDOMNode(this.refs.box);
    console.log(this.boxDOM)

}
toggleBox=()=>{
    this.setState({
        showBox:!this.state.showBox
    })
};
render() {
    return (
        <div>
            <button onClick={this.toggleBox}>切换</button>
            <CSSTransition in={this.state.showBox} classNames="page" timeout={500}
                onEnter={()=>{
                    //this.boxDOM.style.display = "block";
                }}
               onExited={()=>{
                   //this.boxDOM.style.display = "none";
               }}
            >
                <div className="page" >
                    <h1>测试动画效果滴。</h1>
                    <div className="color-box">哈哈哈</div>
                </div>
            </CSSTransition>
        </div>)
}
}
export default Test;