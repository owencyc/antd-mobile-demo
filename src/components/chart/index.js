import React, { Component } from 'react';
import { WhiteSpace, List } from 'antd-mobile';
import PropTypes from 'prop-types'
import TitleLayout from '../../layouts/TitleLayout'
import SubTitle from '../common/SubTitle'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { menuEvent } from '../../actions'

const Item = List.Item

const Chart = props => (
    <div style={{ height: '100%' }}>
        <TitleLayout content='报表' hideBack={true}>
            <List renderHeader={() => '点击进入对应报表'} className="my-list">
                {
                    props.list.map((item,index) => {
                        return (
                            <div key={index}>
                                <Item
                                    arrow="horizontal"
                                    thumb={item.icon}
                                    onClick={() => { props.changeRoute(item.router,item.name) }}
                                >{item.name}</Item>
                                <WhiteSpace size="sm" style={{backgroundColor: '#f5f5f9'}}/>
                            </div>

                        )
                    })
                }

            </List>

        </TitleLayout>

    </div>
)


const mapStateToProps = state => {
    return {
        list: state.chart.list
    }
}

const mapDispatchToProps = dispatch => ({
    changeRoute: (router,title) => { dispatch(push({ pathname:router, state: { title: title} })); }
})
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
