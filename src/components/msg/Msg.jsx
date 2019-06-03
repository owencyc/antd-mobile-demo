import React, { Component } from 'react';
import moment from 'moment'
import { List, InputItem, TextareaItem, DatePicker, Button, WingBlank, WhiteSpace, Calendar, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import PropTypes from 'prop-types'
import {  rsUpdate,rsSubmit } from '../../actions'
import TitleLayout from '../../layouts/TitleLayout'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'



class Msg extends Component {
    constructor(props) {
        //console.log('rs render')
        //console.log(props)
        super(props);

        this.state={
            
        }

    }
    componentDidMount() {
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}


//container
const mapStateToProps = state => {
    return{
        signature : state.app.signature,
        url:state.app.url
    }
}

const mapDispatchToProps = dispatch => ({
    push, dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
