import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  Addition,
  Button
} from './style'
import { CSSTransition } from 'react-transition-group'
import {
  searchFocus,
  searchBlur,
  mouseEnter,
  mouseLeave,
  changePage
} from './store/actions'
import { changeLoginStatus } from '../../containers/login/store/actions'

const mapStateToProps = state => ({
  // focused: state.get('header').get('focused')
  focused: state.getIn(['header', 'focused']),
  mouseIn: state.getIn(['header', 'mouseIn']),
  list: state.getIn(['header', 'list']),
  page: state.getIn(['header', 'page']),
  totalPage: state.getIn(['header', 'totalPage']),
  isLogin: state.getIn(['login', 'isLogin'])
})

const Header = ({
  focused,
  mouseIn,
  list,
  page,
  isLogin,
  totalPage,
  searchFocus,
  searchBlur,
  mouseEnter,
  mouseLeave,
  changePage,
  changeLoginStatus
}) => {
  let spinIcon
  const newList = list.toJS()
  const pageList = []

  if (newList.length) {
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      if (newList[i] !== undefined) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
  }

  const handleChangePage = (page, totalPage, iconDom) => {
    let originAngle =
      iconDom.style.transform && iconDom.style.transform.replace(/[^0-9]/gi, '')
    if (originAngle) {
      originAngle = parseInt(originAngle, 10)
    } else {
      originAngle = 0
    }

    iconDom.style.transform = `rotate(${originAngle + 360}deg)`
    if (page < totalPage) {
      changePage(page + 1)
    } else {
      changePage(1)
    }
  }

  return (
    <div>
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <Link to="/">
            <NavItem className="left active">首页</NavItem>
          </Link>
          <NavItem className="left">下载App</NavItem>
          {isLogin ? (
            <NavItem className="right" onClick={() => changeLoginStatus(false)}>
              退出
            </NavItem>
          ) : (
            <Link to="/login">
              <NavItem className="right">登录</NavItem>
            </Link>
          )}
          <NavItem className="right">
            <i className="iconfont">&#xe65a;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition in={focused} timeout={500} classNames="slide">
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => searchFocus(list)}
                onBlur={() => searchBlur()}
              />
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
              &#xe62e;
            </i>
            {(focused || mouseIn) && (
              <SearchInfo
                onMouseEnter={() => mouseEnter()}
                onMouseLeave={() => mouseLeave()}
              >
                <SearchInfoTitle>
                  热门搜索
                  <SearchInfoSwitch
                    onClick={() => handleChangePage(page, totalPage, spinIcon)}
                  >
                    <i ref={el => (spinIcon = el)} className="iconfont spin">
                      &#xe851;
                    </i>
                    换一批
                  </SearchInfoSwitch>
                </SearchInfoTitle>
                <div>{pageList}</div>
              </SearchInfo>
            )}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className="writing">
              <i className="iconfont">&#xe608;</i>
              写文章
            </Button>
          </Link>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    </div>
  )
}

Header.propTypes = {
  focused: PropTypes.bool.isRequired,
  mouseIn: PropTypes.bool.isRequired,
  list: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  isLogin: PropTypes.bool.isRequired,
  totalPage: PropTypes.number.isRequired,
  searchFocus: PropTypes.func.isRequired,
  searchBlur: PropTypes.func.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  changeLoginStatus: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    searchFocus,
    searchBlur,
    mouseEnter,
    mouseLeave,
    changePage,
    changeLoginStatus
  }
)(Header)