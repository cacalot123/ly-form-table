import React from 'react';

import {Card, Table} from 'antd';
import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import "./style.scss";
import TableGrid from "./tableGrid";

export default class FormTable extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
      t.state = {
      contents: [],
      selectedRowKeys: [],
      loading: false,
      total: '',
      current: '',
      pagination: {},
      pageSize: t.props.pageSize ? t.props.pageSize : TableGrid.pageSize,
      pageSizeChange:t.props.pageSizeChange
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      total: nextProps.total,
      current: nextProps.current,
      pageSize: nextProps.pageSize ? nextProps.pageSize : TableGrid.pageSize
    });
  }

  onChange(current) {
    const t = this;
    t.setState({current});
    t.props.changePage(current, t.state.pageSize);
  }

  onShowSizeChange=(current, pageSize)=> {
    const t = this;
    console.log(t);
    t.setState({pageSize, current});
    t.props.changePage(current, pageSize);
  }


  render() {
    const t = this;
    const pagination = {
      onChange: current => t.onChange(current),
      defaultCurrent: 1,
      showSizeChanger: t.state.pageSizeChange,
      onShowSizeChange: t.onShowSizeChange,
      current: t.state.current,
      style: {marginTop: '10px'},
      pageSize: t.state.pageSize,
      total: t.state.total,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} , 共${total}条`
    };
    return (
      <Card bordered={false} noHovering className="rsTable" bodyStyle={{padding: 0}}>
        <Table
          bordered
          pagination={t.state.total ? {...pagination} : ''}
          {...t.props}
        />
      </Card>
    );
  }
}
