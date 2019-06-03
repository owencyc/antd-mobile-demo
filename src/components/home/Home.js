import React from 'react';
import { Grid, Carousel, NoticeBar, WingBlank, Card } from 'antd-mobile';
import PropTypes from 'prop-types'
import './home.css';
import moment from 'moment';



const Home = (props) => {
  //console.log('home');
  //console.log(props);
  //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
  //afterChange={index => console.log('slide to', index)}
  return (
    <div className='home'>
      <div className='func_panel'>
        <Carousel
          autoplay={true}
          infinite

        >
          {props.imgs.map(item => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={item}
              style={{ display: 'inline-block', width: '100%', height: 176 }}
            >
              <img
                src={item}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  //this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <Grid data={props.funcs} activeStyle={false} hasLine={false} onClick={(dataItem) => props.changeRoute(dataItem.router)} />

        {props.notice ? (
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>{props.notice}</NoticeBar>
        ) : (<div></div>)}

      </div>
      
        <div className='sub-title'>小结</div>
        <div className='card-panel'>
          <Card className='my-card' onClick={()=>{props.dispatch('/fbstation')}}>
            <Card.Header
              title="问题单进度"
            />
            <Card.Body>
              <div>处理中【<span className='num'>{props.onHand}</span>】笔</div>
              <div>待结案【<span className='num'>{props.waitEnd}</span>】笔</div>
            </Card.Body>
          </Card>
          <Card className='my-card' onClick={()=>{props.dispatch('/rsstation')}}>
            <Card.Header
              title="产能"
            />
            <Card.Body>
              <div>{moment().add(1,'months').format('YYYY-MM')}月预计使用产能【<span className='num'>{props.nextUsage}</span>】H</div>
            </Card.Body>
          </Card>
        </div>
      <div className='func_panel'>

      </div>

    </div>
  )
}



export default Home