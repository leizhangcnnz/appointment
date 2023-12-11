import React, { useState } from 'react'
import { Table, Switch, Input, Button, Popconfirm, Form } from 'antd'

import { Link } from 'react-router-dom'

import useAntdTable from '@/hooks/useAntdTable'

import useBreadcrumb from '@/hooks/useBreadcrumb'
import { deleteTradeUser } from '@/redux/tradeUser/actions'

function TradeUserManager(props) {
  useBreadcrumb(['交易用户管理'])

  const [queryParams, setQueryParams] = useState({})
  const [batch, setBatch] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/users/trade',
    queryParams,
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'code',
      },
      {
        title: '手机号',
        dataIndex: 'etMobile',
      },
      {
        title: '服务器',
        dataIndex: 'hostname',
      },
      {
        title: '操作',
        dataIndex: 'code',
        render: (code, record) => {
          return (
            <ul className='action-list'>
              <li>
                <Link to={{ pathname: `/admin/trade-user/edit/${record.code}`, state: { code } }}>编辑</Link>
              </li>
              <li>
                <Popconfirm
                  title='Are you sure?'
                  cancelText='No'
                  onConfirm={e => updateList(() => deleteTradeUser(code))}>
                  <a className='delete-text'>删除</a>
                </Popconfirm>
              </li>
            </ul>
          )
        },
      },
    ],
  })

  function delList() {
    // axios.delete(`/trade-users/list/${selectedRowKeys}`).then(() => {
    //   onSearch()
    //   setSelectedRowKeys([])
    // })
  }

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
    onChange: selectList => setSelectedRowKeys(selectList),
  } : null

  return (
    <div>
      <Form layout='inline' onFinish={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label='关键词' name='keyword'>
          <Input placeholder='请输入关键词' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
            检索
          </Button>
        </Form.Item>
      </Form>

      <Table
        {...tableProps}
        rowSelection={rowSelection}
        footer={() => (
          <>
            批量操作 <Switch checked={batch} onChange={e => setBatch(prev => !prev)} style={{ marginRight: 8 }} />
            {batch && (
              <>
                <Popconfirm
                  title='Are you sure delete the selected users?'
                  // onConfirm={delList}
                  okText='Yes'
                  cancelText='No'>
                  <Button type='danger' size='small' disabled={selectedRowKeys.length === 0}>
                    批量删除
                  </Button>
                </Popconfirm>
              </>
            )}
          </>
        )}
      />
    </div>
  )
}

export default TradeUserManager
