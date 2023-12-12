import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { tieOperators } from '@/redux/tiedOperators/actions'
import { Col, Row, List, Card } from 'antd'
import useAjaxLoading from '@/hooks/useAjaxLoading'

const { Meta } = Card

function TiedOperatorList(props) {
  const dispatch = useDispatch()
  const [loading, withLoading] = useAjaxLoading()
  const default_userTied = { users: [], inconsistentTiedUserDtos: [], referType: '', referTiedOperators: ''}
  const [tiedOperators, setTiedOperators] = useState(default_userTied)
  const [tiedOperators1, setTiedOperators1] = useState(default_userTied)

  useEffect(() => {
    withLoading(dispatch(tieOperators()))
      .then(res => {
        setTiedOperators(res.eachTypeUserTiedStatus[0] ? res.eachTypeUserTiedStatus[0] : default_userTied)
        setTiedOperators1(res.eachTypeUserTiedStatus[1] ? res.eachTypeUserTiedStatus[1] : default_userTied)
      })
      .catch(e => {
        console.log(e)
        props.history.push('/tied-operators')
      })
  }, [])

  return (
    <>
      <Row>
        <Col span={tiedOperators.inconsistentTiedUserDtos.length === 0 ? 0 : 12}>
          <List
            size={'large'}
            header={`[${tiedOperators.inconsistentTiedUserDtos.length}]${tiedOperators.referType} ${tiedOperators.referTiedOperators}`}
            dataSource={tiedOperators.inconsistentTiedUserDtos}
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
        <Col span={tiedOperators1.inconsistentTiedUserDtos.length === 0 ? 0 : 12}>
          <List
            size={'large'}
            header={`[${tiedOperators1.inconsistentTiedUserDtos.length}]${tiedOperators1.referType} ${tiedOperators1.referTiedOperators}`}
            dataSource={tiedOperators1.inconsistentTiedUserDtos}
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
            header={`[${tiedOperators.users.length}]${tiedOperators.referType} ${tiedOperators.referTiedOperators}`}
            dataSource={tiedOperators.users}
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
            header={`[${tiedOperators1.users.length}]${tiedOperators1.referType} ${tiedOperators1.referTiedOperators}`}
            dataSource={tiedOperators1.users}
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

export default TiedOperatorList
