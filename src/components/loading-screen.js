import React from 'react'

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div className='container-loader'>
        <div className='loader'>
          <div className='box'></div>
          <div className='box'></div>
        </div>
        <style jsx>{`
          .container-loader {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(#fff, #fff);
            -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
            height: 100vh;
          }

          .loader {
            display: inline-flex;
            flex-wrap: wrap;
            width: 90px;
            height: 90px;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transform: rotateX(45deg) rotate(45deg);
            transform: rotateX(45deg) rotate(45deg);
          }

          .box {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            background: #fed750;
            box-shadow: 112.5px 112.5px 20px #000;
            -webkit-animation: move 2s ease-in-out infinite both;
            animation: move 2s ease-in-out infinite both;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
          }
          .box:nth-child(1) {
            -webkit-animation-delay: -1s;
            animation-delay: -1s;
          }
          .box:nth-child(2) {
            -webkit-animation-delay: -2s;
            animation-delay: -2s;
          }
          .box:nth-child(3) {
            -webkit-animation-delay: -3s;
            animation-delay: -3s;
          }
          .box:before,
          .box:after {
            display: block;
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
          }
          .box:before {
            top: 100%;
            left: 0;
            background: #e6a32f;
            -webkit-transform-origin: center top;
            transform-origin: center top;
            -webkit-transform: rotateX(-90deg);
            transform: rotateX(-90deg);
          }
          .box:after {
            top: 0;
            left: 100%;
            background: #c87932;
            -webkit-transform-origin: center left;
            transform-origin: center left;
            -webkit-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          @-webkit-keyframes move {
            0%,
            100% {
              -webkit-transform: none;
              transform: none;
            }
            12.5% {
              -webkit-transform: translate(30px, 0);
              transform: translate(30px, 0);
            }
            25% {
              -webkit-transform: translate(60px, 0);
              transform: translate(60px, 0);
            }
            37.5% {
              -webkit-transform: translate(60px, 30px);
              transform: translate(60px, 30px);
            }
            50% {
              -webkit-transform: translate(60px, 60px);
              transform: translate(60px, 60px);
            }
            62.5% {
              -webkit-transform: translate(30px, 60px);
              transform: translate(30px, 60px);
            }
            75% {
              -webkit-transform: translate(0, 60px);
              transform: translate(0, 60px);
            }
            87.5% {
              -webkit-transform: translate(0, 30px);
              transform: translate(0, 30px);
            }
          }

          @keyframes move {
            0%,
            100% {
              -webkit-transform: none;
              transform: none;
            }
            12.5% {
              -webkit-transform: translate(30px, 0);
              transform: translate(30px, 0);
            }
            25% {
              -webkit-transform: translate(60px, 0);
              transform: translate(60px, 0);
            }
            37.5% {
              -webkit-transform: translate(60px, 30px);
              transform: translate(60px, 30px);
            }
            50% {
              -webkit-transform: translate(60px, 60px);
              transform: translate(60px, 60px);
            }
            62.5% {
              -webkit-transform: translate(30px, 60px);
              transform: translate(30px, 60px);
            }
            75% {
              -webkit-transform: translate(0, 60px);
              transform: translate(0, 60px);
            }
            87.5% {
              -webkit-transform: translate(0, 30px);
              transform: translate(0, 30px);
            }
          }
        `}</style>
      </div>
    )
  }
}
