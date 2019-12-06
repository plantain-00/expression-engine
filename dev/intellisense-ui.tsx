import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AutoComplete } from 'select2-react-component'
import { getIntellisenseContext, getIntellisenseOptions } from '../dist/browser'

class Main extends React.Component<{}, {}> {
  state = {
    value: '',
    data: [],
  }

  render() {
    return (
      <AutoComplete data={this.state.data}
        value={this.state.value}
        search={value => {
          console.info(value)
          this.setState({ value })
        }}
        keydown={e => {
          const value = (e.target as HTMLInputElement).value
          const selectionStart = (e.target as HTMLInputElement).selectionStart!
          console.info(value, e.key, selectionStart)
          this.setState({ value })
          console.info(getIntellisenseOptions(getIntellisenseContext(value, selectionStart), {
            stringEnums: [
              {
                name: 'vertical'
              },
              {
                name: 'horizontal'
              }
            ]
          }))
        }}
        select={value => {
          this.setState({ value })
        }}>
      </AutoComplete>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('container'))
