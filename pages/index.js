import React from 'react'
import Examples from 'src/components/elements/examples'
import { Form, Input, Icon, Button, Layout } from 'antd'

import {get as _get} from 'lodash'
import hocProtectLogin from 'src/hoc/is-authenticated'
import Router from 'next/router'
import Link from 'next/link';



@hocProtectLogin
export default class Index extends React.Component {

  componentDidMount() {
  }
  render() {
    return (
      <div>
        <Link href="/test">
          <a>aaaa</a>
        </Link>
        <Button>
          abc
        </Button>
      </div>
    )
  }
}
