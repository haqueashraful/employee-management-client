import { Table } from "antd";

const CommonTable = ({ data, columns }) => {
  const pageSize = 5;

  const dataSource = data.map((work, index) => ({
    ...work,
    index: index + 1,
  }));

  return (
    <div className=" overflow-x-auto">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: pageSize }}
      />
    </div>
  );
};

export default CommonTable;
