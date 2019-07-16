import React from 'react'

const withLogic = ({ apiGetList, pageSize = 10 }) => WrappedComponent => {
  return class ComponentWithLogic extends React.Component {
    state = {
      isLoading: false,
      dataSource: [],
      pagination: {
        pageSize,
        page: 1
      }
    }

    fetchData = async () => {
      const { pagination } = this.state
      const response = await apiGetList({
        page: pagination.page,
        pageSize: pagination.pageSize
      })
      if (response.status === 200) {
        const { list, pagination } = response.data
        this.setState({
          isLoading: false,
          dataSource: list,
          pagination: {
            ...pagination,
            current: pagination.page
          }
        })
      } else {
        this.setState({
          isLoading: false
        })
      }
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
          ></WrappedComponent>
        </React.Fragment>
      )
    }
  }
}

export default withLogic
