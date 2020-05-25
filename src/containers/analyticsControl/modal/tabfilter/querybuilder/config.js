import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { merge, sortBy } from 'lodash-es'
import { Icon, Tooltip } from 'antd'
import {
  Widgets,
  BasicConfig,
  // types:
  Operators,
  Fields,
  Config,
  Types,
  Conjunctions,
  Settings,
  LocaleSettings,
  OperatorProximity,
  Funcs
} from 'react-awesome-query-builder'
import en_US from 'antd/lib/locale-provider/en_US'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import $ from 'jquery'
import { get as _get } from 'lodash-es'
import PlaceHolderDropGroup from './placeHolderDropGroup'
const { FieldSelect, FieldDropdown, FieldCascader, VanillaFieldSelect } = Widgets

const reA = /[^a-zA-Z]/g
const reN = /[^0-9]/g

function sortAlphaNum(a, b) {
  if (!a) return 1
  if (!b) return -1
  var aA = a.replace(reA, '')
  var bA = b.replace(reA, '')
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ''), 10)
    var bN = parseInt(b.replace(reN, ''), 10)
    return aN === bN ? 0 : aN > bN ? 1 : -1
  } else {
    return aA > bA ? 1 : -1
  }
}

const conjunctions = {
  ...BasicConfig.conjunctions
}

const proximity = {
  ...BasicConfig.operators.proximity,
  valueLabels: [
    { label: 'Word 1', placeholder: 'Enter first word' },
    { label: 'Word 2', placeholder: 'Enter second word' }
  ],
  textSeparators: [
    //'Word 1',
    //'Word 2'
  ],
  options: {
    ...BasicConfig.operators.proximity.options,
    optionLabel: 'Near', // label on top of "near" selectbox (for config.settings.showLabels==true)
    optionTextBefore: 'Near', // label before "near" selectbox (for config.settings.showLabels==false)
    optionPlaceholder: 'Select words between', // placeholder for "near" selectbox
    minProximity: 2,
    maxProximity: 10,
    defaults: {
      proximity: 2
    },
    customProps: {}
  }
}

const operators = {
  ...BasicConfig.operators,
  // examples of  overriding
  between: {
    ...BasicConfig.operators.between,
    valueLabels: ['Value from', 'Value to'],
    textSeparators: ['from', 'to']
  },
  proximity,
  equal: {
    ...BasicConfig.operators.equal,
    label: 'Equal',
    labelForFormat: '==',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} == ${value}`
  },
  not_equal: {
    ...BasicConfig.operators.not_equal,
    label: 'Not equal',
    labelForFormat: '!=',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} != ${value}`
  },
  equal_number: {
    ...BasicConfig.operators.equal
  },
  not_equal_number: {
    ...BasicConfig.operators.not_equal
  },
  less: {
    ...BasicConfig.operators.less,
    label: 'Less than',
    labelForFormat: '<',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} < ${value}`
  },
  less_or_equal: {
    ...BasicConfig.operators.less_or_equal,
    label: 'Less than or equal to',
    labelForFormat: '<=',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} <= ${value}`
  },
  greater: {
    ...BasicConfig.operators.greater,
    label: 'More than',
    labelForFormat: '>',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} > ${value}`
  },
  greater_or_equal: {
    ...BasicConfig.operators.greater_or_equal,
    label: 'More than or equal to',
    labelForFormat: '=>',
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field} >= ${value}`
  },
  like: {
    ...BasicConfig.operators.like,
    label: 'Includes',
    labelForFormat: 'includes',
    cardinality: 1,
    isUnary: false,
    // formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `indexOf(${value},__${field}) != -1`
    // formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${value}.indexOf(__${field}) != -1`
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `__${field}.includes(${value})`
  },
  not_like: {
    ...BasicConfig.operators.not_like,
    label: 'Not includes',
    labelForFormat: 'includes',
    cardinality: 1,
    isUnary: false,
    // formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `indexOf(${value},__${field}) == -1`
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `!__${field}.includes(${value})`
  }
}

const widgets = {
  ...BasicConfig.widgets
  // examples of  overriding
  // text: {
  //   ...BasicConfig.widgets.text,
  //   validateValue: (val, fieldDef) => {
  //     return val.length < 10
  //   }
  // }
  // slider: {
  //   ...BasicConfig.widgets.slider,
  //   customProps: {
  //     width: '300px'
  //   }
  // },
  // rangeslider: {
  //   ...BasicConfig.widgets.rangeslider,
  //   customProps: {
  //     width: '300px'
  //   }
  // },
  // date: {
  //   ...BasicConfig.widgets.date,
  //   dateFormat: 'DD.MM.YYYY',
  //   valueFormat: 'YYYY-MM-DD'
  // },
  // time: {
  //   ...BasicConfig.widgets.time,
  //   timeFormat: 'HH:mm',
  //   valueFormat: 'HH:mm:ss'
  // },
  // datetime: {
  //   ...BasicConfig.widgets.datetime,
  //   timeFormat: 'HH:mm',
  //   dateFormat: 'DD.MM.YYYY',
  //   valueFormat: 'YYYY-MM-DD HH:mm:ss'
  // },
  // func: {
  //   ...BasicConfig.widgets.func,
  //   customProps: {
  //     showSearch: true
  //   }
  // }
}

const types = {
  ...BasicConfig.types,
  // examples of  overriding
  boolean: merge(BasicConfig.types.boolean, {
    widgets: {
      boolean: {
        widgetProps: {
          hideOperator: true,
          operatorInlineLabel: 'is'
        }
      }
    }
  })
}

const localeSettings = {
  // locale: {
  //   short: 'ru',
  //   full: 'ru-RU',
  //   antd: ru_RU
  // },
  valueLabel: 'Value',
  valuePlaceholder: 'Value',
  fieldLabel: 'Field',
  operatorLabel: 'Operator',
  funcLabel: 'Function',
  fieldPlaceholder: 'Select field',
  funcPlaceholder: 'Select function',
  operatorPlaceholder: 'Select operator',
  deleteLabel: null,
  addGroupLabel: 'Add group',
  addRuleLabel: 'Add rule',
  delGroupLabel: null,
  notLabel: 'Not',
  valueSourcesPopupTitle: 'Select value source',
  removeRuleConfirmOptions: {
    title: 'Are you sure delete this rule?',
    okText: 'Yes',
    okType: 'danger'
  },
  removeGroupConfirmOptions: {
    title: 'Are you sure delete this group?',
    okText: 'Yes',
    okType: 'danger'
  }
}

const settings = {
  ...BasicConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: 'Value',
      widget: 'value'
    }
    // field: {
    //   label: 'Field',
    //   widget: 'field'
    // },
    // func: {
    //   label: 'Function',
    //   widget: 'func'
    // }
  },
  // canReorder: true,
  // canRegroup: true,
  // showNot: true,
  // showLabels: true,
  maxNesting: 3,
  canLeaveEmptyGroup: true, //after deletion

  renderField: props => {
    // console.log('renderField', props)
    return <NodeTamp {...props} />
  },
  // renderField: props => <FieldSelect {...props} />,
  // renderField: props => <span>hahah</span>,
  renderOperator: props => <FieldDropdown {...props} />,
  renderFunc: props => <FieldSelect {...props} />
}

//////////////////////////////////////////////////////////////////////

const fields = {
  text: {
    type: 'text',
    operators: ['equal', 'not_equal'],
    valueSources: ['value']
  }
  // num2: {
  //   type: 'number',
  //   operators: ['equal', 'not_equal'],
  //   valueSources: ['value']
  // },
  // user: {
  //   label: 'User',
  //   tooltip: 'Group of fields',
  //   type: '!struct',
  //   subfields: {
  //     firstName: {
  //       label2: 'Username', //only for menu's toggler
  //       type: 'text',
  //       excludeOperators: ['proximity'],
  //       mainWidgetProps: {
  //         valueLabel: 'Name',
  //         valuePlaceholder: 'Enter name',
  //         validateValue: (val, fieldDef) => {
  //           return val.length < 10
  //         }
  //       }
  //     },
  //     login: {
  //       type: 'text',
  //       tableName: 't1', // PR #18, PR #20
  //       excludeOperators: ['proximity'],
  //       mainWidgetProps: {
  //         valueLabel: 'Login',
  //         valuePlaceholder: 'Enter login',
  //         validateValue: (val, fieldDef) => {
  //           return val.length < 10 && (val == '' || val.match(/^[A-Za-z0-9_-]+$/) !== null)
  //         }
  //       }
  //     }
  //   }
  // },
  // prox1: {
  //   label: 'prox',
  //   tooltip: 'Proximity search',
  //   type: 'text',
  //   operators: ['proximity']
  // },
  // num: {
  //   label: 'Number',
  //   type: 'number',
  //   preferWidgets: ['number'],
  //   fieldSettings: {
  //     min: -1,
  //     max: 5
  //   }
  // },
  // slider: {
  //   label: 'Slider',
  //   type: 'number',
  //   preferWidgets: ['slider', 'rangeslider'],
  //   valueSources: ['value'],
  //   fieldSettings: {
  //     min: 0,
  //     max: 100,
  //     step: 1,
  //     marks: {
  //       0: <strong>0%</strong>,
  //       100: <strong>100%</strong>
  //     }
  //   },
  //   //overrides
  //   widgets: {
  //     slider: {
  //       widgetProps: {
  //         valuePlaceholder: '..Slider'
  //       }
  //     }
  //   }
  // },
  // date: {
  //   label: 'Date',
  //   type: 'date',
  //   valueSources: ['value'],
  //   fieldSettings: {
  //     dateFormat: 'DD-MM-YYYY'
  //   }
  // },
  // time: {
  //   label: 'Time',
  //   type: 'time',
  //   valueSources: ['value'],
  //   operators: ['greater_or_equal', 'less_or_equal', 'between'],
  //   defaultOperator: 'between'
  // },
  // datetime: {
  //   label: 'DateTime',
  //   type: 'datetime',
  //   valueSources: ['value']
  // },
  // datetime2: {
  //   label: 'DateTime2',
  //   type: 'datetime',
  //   valueSources: ['value']
  // },
  // color: {
  //   label: 'Color',
  //   type: 'select',
  //   valueSources: ['value'],
  //   listValues: {
  //     yellow: 'Yellow',
  //     green: 'Green',
  //     orange: 'Orange'
  //   }
  // },
  // color2: {
  //   label: 'Color2',
  //   type: 'select',
  //   listValues: {
  //     yellow: 'Yellow',
  //     green: 'Green',
  //     orange: 'Orange',
  //     purple: 'Purple'
  //   }
  // },
  // multicolor: {
  //   label: 'Colors',
  //   type: 'multiselect',
  //   listValues: {
  //     yellow: 'Yellow',
  //     green: 'Green',
  //     orange: 'Orange'
  //   },
  //   allowCustomValues: true
  // },
  // stock: {
  //   label: 'In stock',
  //   type: 'boolean',
  //   defaultValue: true,
  //   fieldSettings: {
  //     labelYes: '+',
  //     labelNo: '-'
  //   }
  // }
}

const config = {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields,
  funcs: {}
}

export default config

class NodeTamp extends React.Component {
  state = {
    parent: undefined,
    parentbody: undefined
  }
  componentDidMount() {
    console.log('dismound', this.props)
    let parent = $(ReactDOM.findDOMNode(this)).closest('[data-id]')[0]
    let parentbody = $(ReactDOM.findDOMNode(this)).closest('.rule--body')[0]

    this.setState({
      mounted: true,
      parent: parent,
      parentbody,
      dataId: $(parent).attr('data-id')
    })
    //
  }
  render() {
    let noteData = _get(this.props, 'selectedOpts.noteData', [])
    return (
      <span>
        {_get(this.props, 'selectedOpts.label')}
        {this.state.parent &&
          ReactDOM.createPortal(
            <PlaceHolderDropGroup
              dataId={this.state.dataId}
              cbHandleDropIntoRule={_get(this.props, 'selectedOpts.cbHandleDropIntoRule')}
            />,
            this.state.parent
          )}
        {this.state.parentbody &&
          ReactDOM.createPortal(
            <Tooltip
              title={
                <div style={{ fontSize: 12 }}>
                  {noteData.sort(sortAlphaNum).map((text, index) => {
                    if (index < 10)
                      return (
                        <p style={{ marginBottom: 4 }} key={index}>
                          {text}
                        </p>
                      )
                    else
                      return (
                        <i key={index} style={{ opacity: 0.5 }}>
                          (And More)
                        </i>
                      )
                  })}
                </div>
              }
            >
              <Icon style={{ marginLeft: 8, float: 'right', marginTop: 4 }} theme='twoTone' type='info-circle' />
            </Tooltip>,
            this.state.parentbody
          )}
      </span>
    )
    // <FieldSelect {...this.props} />
  }
}
