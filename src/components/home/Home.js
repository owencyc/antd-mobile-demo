import React from 'react';
import { Grid,Carousel } from 'antd-mobile';
import PropTypes from 'prop-types'
import './home.css';



const Home=(home,changeRoute)=>{
  console.log('home');
  console.log(home);
  return (
  <div className='home'>
    <div className='func_panel'> 
    <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {home.imgs.map(item => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={item}
              style={{ display: 'inline-block', width: '100%', height: 176}}
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
        <Grid data={home.funcs} activeStyle={false} hasLine={false} onClick={changeRoute} />

    </div>

    <div className='func_panel'> 

    </div>
    
  </div>
)}

Home.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  funcs:PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      router: PropTypes.string
      
  }).isRequired).isRequired
}

export default Home