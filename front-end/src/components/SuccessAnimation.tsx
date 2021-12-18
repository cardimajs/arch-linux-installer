/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/system';

const SuccessAnimation: React.FC = styled((props) => {
  return (
    <>
      <div className="sa" {...props} style={{ height: '110px' }}>
        <div className="sa-success">
          <div className="sa-success-tip" />
          <div className="sa-success-long" />
          <div className="sa-success-placeholder" />
          <div className="sa-success-fix" />
        </div>
      </div>
    </>
  );
})`
  .sa {
    // width: 140px;
    // height: 110px;
    padding: 26px;
    background-color: ${(props) => props?.theme?.palette?.background?.paper};
    &-success {
      border-radius: 50%;
      border: 4px solid #a5dc86;
      box-sizing: content-box;
      height: 80px;
      padding: 0;
      position: relative;
      background-color: ${(props) => props?.theme?.palette?.background?.paper};
      width: 80px;
      &:after,
      &:before {
        background: ${(props) => props?.theme?.palette?.background?.paper};
        content: '';
        height: 120px;
        position: absolute;
        transform: rotate(45deg);
        width: 60px;
      }
      &:before {
        border-radius: 40px 0 0 40px;
        width: 26px;
        height: 80px;
        top: -17px;
        left: 5px;
        transform-origin: 60px 60px;
        transform: rotate(-45deg);
      }
      &:after {
        border-radius: 0 120px 120px 0;
        left: 30px;
        top: -11px;
        transform-origin: 0 60px;
        transform: rotate(-45deg);
        animation: rotatePlaceholder 4.25s ease-in;
      }
      &-placeholder {
        border-radius: 50%;
        border: 4px solid rgba(165, 220, 134, 0.7);
        box-sizing: content-box;
        height: 80px;
        left: -4px;
        position: absolute;
        top: -4px;
        width: 80px;
        z-index: 2;
      }
      &-fix {
        background-color: ${(props) =>
          props?.theme?.palette?.background?.paper};
        height: 90px;
        left: 28px;
        position: absolute;
        top: 8px;
        transform: rotate(-45deg);
        width: 5px;
        z-index: 1;
      }
      &-tip,
      &-long {
        background-color: #a5dc86;
        border-radius: 2px;
        height: 5px;
        position: absolute;
        z-index: 2;
      }
      &-tip {
        left: 14px;
        top: 46px;
        transform: rotate(45deg);
        width: 25px;
        animation: animateSuccessTip 0.75s;
      }
      &-long {
        right: 8px;
        top: 38px;
        transform: rotate(-45deg);
        width: 47px;
        animation: animateSuccessLong 0.75s;
      }
    }
  }
  @keyframes animateSuccessTip {
    0%,
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }
  @keyframes animateSuccessLong {
    0%,
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
  @keyframes rotatePlaceholder {
    0%,
    5% {
      transform: rotate(-45deg);
    }
    100%,
    12% {
      transform: rotate(-405deg);
    }
  }
`;

export default SuccessAnimation;
