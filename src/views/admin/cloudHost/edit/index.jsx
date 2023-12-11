import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Input, message, Radio, Space, Divider } from 'antd'
import useBreadcrumb from '@/hooks/useBreadcrumb'

import './index.less'
import { getCldHostByHostname, addHost } from '@/redux/cldHost/actions'
import { refreshCache, restartServices, getNUserHost } from '@/redux/setting/actions'
import { refresh } from 'less'

function Edit(props) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const hostname = props.match.params.hostname
  const editId = props.match.params.id
  const [boardInfo, setBoardInfo] = useState('')
  useBreadcrumb([{ link: '/admin/cld-host/manager', name: '主机管理' }, editId ? '编辑主机' : '新增主机'])

  useEffect(() => {
    if (hostname) {
      dispatch(getCldHostByHostname(hostname)).then(res => {
        form.setFieldsValue({...res})
      })
    }
  }, [props.match.params])

  function add(values) {
    dispatch(addHost(values)).then(res => {
      if (res) {
        if (hostname) {
          message.success('更新成功')
        } else {
          message.success('添加成功')
        }
      } else {
        if (hostname) {
          message.success('更新失败')
        } else {
          message.success('添加失败')
        }
      }
    })
  }

  return (
    <div className='admin-edit-article'>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 4 }}
        initialValues={{ following: 'TRADITIONAL_TIE'}}
        onFinish={add}
        autoComplete='off'
      >
        <Form.Item
          label='服务器'
          name='hostname'
          rules={[{ required: true, message: 'Please input hostname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='换绑方式'
          name='following'
        >
          <Radio.Group
            options={
              [
                { label: '单绑', value: 'SINGLE_TIE' },
                { label: '多绑', value: 'TRADITIONAL_TIE' }
              ]
            }
            optionType='button'
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
          <Button type='primary' htmlType='submit'>
            {hostname ? '提交更新' : '提交'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Space split={<Divider type='vertical' />}>
            <Button type='dashed' htmlType='button' onClick={() => getNUserHost(1, setBoardInfo)}>可用服务器</Button>
            <Button type='dashed' htmlType='button' onClick={() => refreshCache(setBoardInfo)}>刷新缓存</Button>
            <Button type='dashed' htmlType='button' onClick={() => restartServices(setBoardInfo)}>重启服务</Button>
          </Space>
        </Form.Item>
      </Form>
      <div>{boardInfo}</div>
    </div>
  )
}

export default Edit
