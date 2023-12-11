import React, { Component, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Popconfirm, Switch, Input, Button, Form } from 'antd'

import { Link } from 'react-router-dom'
import useAntdTable from '@/hooks/useAntdTable'
import useBreadcrumb from '@/hooks/useBreadcrumb'

import { deleteHost } from '@/redux/cldHost/actions'

function ArticleManager(props) {
  useBreadcrumb(['主机管理'])
  const dispatch = useDispatch()

  const [queryParams, setQueryParams] = useState({})
  const [batch, setBatch] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/cloud-hosts',
    queryParams,
    columns: [
      {
        title: '主机名',
        dataIndex: 'hostname'
      },
      {
        title: '跟随方式',
        dataIndex: 'following',
        render: text => text === 'SINGLE_TIE' ? '单绑' : '多绑'
      },
      {
        dataIndex: 'hostname',
        title: '操作',
        render: (hostname, record) => {
          return (
            <ul className='action-list'>
              <li>
                <Link to={{ pathname: `/admin/cld-host/edit/${hostname}`, state: { hostname } }}>编辑</Link>
              </li>
              <li>
                <Popconfirm
                  title='Are you sure?'
                  cancelText='No'
                  onConfirm={e => updateList(() => deleteHost(hostname))}>
                  <a className='delete-text'>删除</a>
                </Popconfirm>
              </li>
            </ul>
          )
        }
      }
    ]
  })

  const handleSubmit = values => {
    try {
      setQueryParams({ ...queryParams, ...values })
      onSearch({ ...queryParams, ...values })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const rowSelection = batch ? {
    selectedRowKeys,
    onChange: selectList => setSelectedRowKeys(selectList)
  } : null

  return (
    <div className='admin-article-manager'>
      <Form layout='inline' onFinish={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label='关键词' name='keyword'>
          <Input placeholder='请输入主机关键词' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>检索</Button>
        </Form.Item>
      </Form>

      <Table {...tableProps}
        rowSelection={rowSelection}
        footer={() => (
          <>
            批量操作 <Switch checked={batch} onChange={e => setBatch(prev => !prev)} style={{ marginRight: 8 }} />
          </>
        )} />
    </div>
  )
}

export default ArticleManager
