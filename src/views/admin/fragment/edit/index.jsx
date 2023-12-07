import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useBreadcrumb from '@/hooks/useBreadcrumb'
import { Form, Button, Divider, Space, Input, message } from 'antd'
import { addTradeUser, getTradeUserById, validateTraceUser, getTradeUserTied, getTradeUserMt4Budget, tieAllLeftOperators, saveAllTieOperators, refreshEtToken, refreshCache, restartServices, getNUserHost } from '@/redux/tradeUser/actions'

function TradeUser(props) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const userCode = props.match.params.code
  const [boardInfo, setBoardInfo] = useState('')

  useBreadcrumb([userCode ? '编辑交易用户' : '添加交易用户'])

  useEffect(() => {
    if (userCode) {
      dispatch(getTradeUserById(userCode)).then(res => {
        form.setFieldsValue({...res})
      })
    }
  }, [form])

  function add(values) {
    dispatch(addTradeUser(values)).then(res => {
      message.success('创建成功')
    })
  }

  function isValidUser() {
    const code = form.getFieldValue('code')
    const password = form.getFieldValue('etPassword')
    dispatch(validateTraceUser(code, password)).then(message => {
      setBoardInfo(message)
    })
  }

  function getTradeUserTiedOperators() {
    const code = form.getFieldValue('code')
    dispatch(getTradeUserTied(code)).then(tiedOperators => {
      setBoardInfo(tiedOperators === undefined || tiedOperators.length !== 0 ? tiedOperators.toString() : '无绑定')
    })
  }

  function getTradeUserBudget() {
    const code = form.getFieldValue('code')
    dispatch(getTradeUserMt4Budget(code)).then(budget => {
      setBoardInfo(budget)
    })
  }

  function tieLeftOperators() {
    const code = form.getFieldValue('code')
    dispatch(tieAllLeftOperators(code)).then(message => {
      setBoardInfo(message)
    })
  }

  function saveAllTieOperatorsInfo() {
    const code = form.getFieldValue('code')
    dispatch(saveAllTieOperators(code)).then(message => {
      setBoardInfo(message)
    })
  }

  function generateToken() {
    const code = form.getFieldValue('code')
    const password = form.getFieldValue('etPassword')
    dispatch(refreshEtToken(code, password)).then(message => {
      setBoardInfo(message)
    })
  }

  function get1UserHost() {
    dispatch(getNUserHost(1)).then(hostnames => {
      setBoardInfo(hostnames.toString())
    })
  }

  function refresh() {
    dispatch(refreshCache()).then(message => {
      setBoardInfo(message)
    })
  }

  function restart() {
    dispatch(restartServices()).then(message => {
      setBoardInfo(message)
    })
  }

  return (
    <div className='admin-edit-article'>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 4 }}
        onFinish={add}
        autoComplete='off'
      >
        <Form.Item
          label='用户名'
          name='code'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='etPassword'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='操作密码'
          name='etOperationPassword'
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='服务器'
          name='hostname'
          rules={[{ required: true, message: 'Please input hostname!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
          <Button type='primary' htmlType='submit'>
            {userCode ? '提交更新' : '提交'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Space split={<Divider type='vertical' />}>
            <Button type='dashed' htmlType='button' onClick={isValidUser}>检查用户设置</Button>
            <Button type='dashed' htmlType='button' onClick={generateToken}>生成Token</Button>
            <Button type='dashed' htmlType='button' onClick={getTradeUserBudget}>查看余额</Button>
            <Button type='dashed' htmlType='button' onClick={getTradeUserTiedOperators}>查看绑定</Button>
            <Button type='dashed' htmlType='button' onClick={tieLeftOperators}>绑定剩余所有</Button>
            <Button type='dashed' htmlType='button' onClick={saveAllTieOperatorsInfo}>保存用户所有绑定信息</Button>
            <Button type='dashed' htmlType='button' onClick={get1UserHost}>可用服务器</Button>
            <Button type='dashed' htmlType='button' onClick={refresh}>刷新缓存</Button>
            <Button type='dashed' htmlType='button' onClick={restart}>重启服务</Button>
          </Space>
        </Form.Item>
      </Form>
      <div>{boardInfo}</div>
    </div>
  )
}

export default TradeUser
