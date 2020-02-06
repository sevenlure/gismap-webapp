import React from 'react'

const withLogic = ({ apiGetList, pageSize = 20 }) => WrappedComponent => {
  return class ComponentWithLogic extends React.Component {
    state = {
      isLoading: true,
      dataSource: [],
      pagination: {
        pageSize,
        page: 1,
        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} Results`
      },
      querySearch: {}
    }

    fetchData = async () => {
      const { pagination, querySearch } = this.state
      apiGetList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...querySearch
      })
        .then(response => {
          const { list, pagination } = response.data
          this.setState({
            isLoading: false,
            dataSource: list,
            pagination: {
              ...pagination,
              current: pagination.page
            }
          })
        })
        .catch(() => {
          this.setState({
            isLoading: false
          })
        })
    }

    reloadTable = async () => {
      this.setState({ isLoading: true }, () => {
        this.fetchData()
      })
    }

    onPageChange = async (page, pageSize) => {
      this.setState(
        {
          isLoading: true,
          pagination: {
            ...this.state.pagination,
            page: page,
            current: page,
            pageSize
          }
        },
        () => {
          this.fetchData()
        }
      )
    }

    onChangeSearch = async querySearch => {
      this.setState(
        {
          isLoading: true,
          pagination: {
            ...this.state.pagination,
            page: 1,
            current: 1
          },
          querySearch: querySearch
        },
        () => {
          this.fetchData()
        }
      )
    }

    columnStt = {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      // className: 'item-text-center',
      key: 'STT',
      render: (text, record, index) => {
        const { page, pageSize } = this.state.pagination
        return (page - 1) * pageSize + index + 1
      }
    }

    async componentDidMount() {
      this.fetchData()
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            dataSource={this.state.dataSource}
            pagination={{
              ...this.state.pagination,
              onChange: this.onPageChange
            }}
            isLoading={this.state.isLoading}
            onChangeSearch={this.onChangeSearch}
            reloadTable={this.reloadTable}
            columnStt={this.columnStt}
            {...this.props}
          ></WrappedComponent>
        </React.Fragment>
      )
    }
  }
}

export default withLogic
