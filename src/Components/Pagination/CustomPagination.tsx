import React from 'react';
import { Pagination } from 'antd';

interface Props {
  total: number;
  onChange?: (page: number, pageSize?: number | undefined) => void;
  changePageSize?: (current: number, size: number) => void;
  current?: number;
}

const CustomPagination = ({ total, onChange, changePageSize, current }: Props) => (
  <Pagination
    total={total}
    showQuickJumper
    showSizeChanger
    current={current}
    // onShowSizeChange={changePageSize}
    pageSizeOptions={["10", "20", "50"]}
    // showTotal={(total) => `Total ${total} items`}
    onChange={onChange}
  />
);

export default CustomPagination;