import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { tieOperators } from '@/redux/tiedOperators/actions'
import './index.less'
import { Col, Row, Comment, Tooltip, List, Card, Avatar } from 'antd'
import axios from '@/utils/axios'
import useAjaxLoading from '@/hooks/useAjaxLoading'
import dayjs from '@/utils/dayjs'

const { Meta } = Card

function FragmentList(props) {
  const dispatch = useDispatch()
  const [loading, withLoading] = useAjaxLoading()
  const default_userTied = { users: [], inconsistentTiedUserDtos: [], referType: '', referTiedOperators: ''}
  const [fragment, setFragment] = useState(default_userTied)
  const [fragment1, setFragment1] = useState(default_userTied)

  useEffect(() => {
    withLoading(dispatch(tieOperators()))
      .then(res => {
        setFragment(res.eachTypeUserTiedStatus[0] ? res.eachTypeUserTiedStatus[0] : default_userTied)
        setFragment1(res.eachTypeUserTiedStatus[1] ? res.eachTypeUserTiedStatus[1] : default_userTied)
      })
      .catch(e => {
        console.log(e)
        props.history.push('/tied-operators')
      })
  }, [])

  return (
    <>
      <Row>
        <Col span={fragment.inconsistentTiedUserDtos.length === 0 ? 0 : 12}>
          <List
            size={'large'}
            header={`[${fragment.inconsistentTiedUserDtos.length}]${fragment.referType} ${fragment.referTiedOperators}`}
            dataSource={fragment.inconsistentTiedUserDtos}
            split={true}
            style={{width: '80%', marginTop: '5%', alignSelf: 'center'}}
            renderItem={item => (
              <List.Item key={item.username} style={{width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.hostname} {item.code}</p>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.userTiedOperators}</p>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={fragment1.inconsistentTiedUserDtos.length === 0 ? 0 : 12}>
          <List
            size={'large'}
            header={`[${fragment1.inconsistentTiedUserDtos.length}]${fragment1.referType} ${fragment1.referTiedOperators}`}
            dataSource={fragment1.inconsistentTiedUserDtos}
            split={true}
            style={{width: '80%', marginTop: '5%', alignSelf: 'center'}}
            renderItem={item => (
              <List.Item key={item.username} style={{width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.hostname} {item.code}</p>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.userTiedOperators}</p>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <List
            size={'large'}
            header={`[${fragment.users.length}]${fragment.referType} ${fragment.referTiedOperators}`}
            dataSource={fragment.users}
            split={true}
            style={{width: '80%', marginTop: '5%', alignSelf: 'center'}}
            renderItem={item => (
              <List.Item key={item.username} style={{width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.hostname} {item.code}</p>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            size={'large'}
            header={`[${fragment1.users.length}]${fragment1.referType} ${fragment1.referTiedOperators}`}
            dataSource={fragment1.users}
            split={true}
            style={{width: '80%', marginTop: '5%', alignSelf: 'center'}}
            renderItem={item => (
              <List.Item key={item.username} style={{width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                  <p style={{justifySelf: 'flex-start', marginLeft: '3%', fontFamily: 'Comic Sans MS', fontSize: 15}}>{item.hostname} {item.code}</p>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  )
}

export default FragmentList
