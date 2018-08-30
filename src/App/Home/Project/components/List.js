import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { SortablePane, Pane } from 'react-sortable-pane';
import { Row, ListItem } from '../../../../utils/anvil'
import EditableItem from './EditableItem';


// type State = {
//   order: string[];
//   panes: { [key: string]: { height: number } };
// };

// We are going to recieve the sections with tasks as sub arrays and iterate thought them
// we will build an object with keys being `sectionPos,taskPos` and values being the task object
// we can then do Object.keys(items).sort() to get the order

function debounce(func, wait) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

const mapItems = (sections) => {
  return sections.reduce((acc, item) => {
    acc[`${item.position},0`] = item

    const items = item.tasks.map(task => (
      {key: `${item.position},${task.position}`, value: task}
    ), item)

    return items.reduce((acc, item) => {
      return {...acc, [item.key]: item.value}
    }, acc)
  }, {})
}

class SortableList extends React.Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    if (!state.panes) {
      state.panes = props.sections ? mapItems(props.sections) : {}
      state.order = Object.keys(state.panes).sort()
    }
    
		return state
	}

  render() {
    if(!this.state.panes){
      return null
    }
    
    const { order, panes } = this.state
    const onOrderChange = (order) => {
      this.setState({ order });
    }

    const list = Object.keys(panes).map(key => (
      <Pane key={key} defaultSize={{ width: '100%'} } resizable={{x:false, y:false, xy:false }}>
        <li 
          className={`list ma1 h2 pointer:hover ${ panes[key].section ? 'shadow-hover' : 'f4'}`} 
          onClick={() => this.props.selectItem({data: panes[key]})}>
          <EditableItem
              item={{data: panes[key]}}
              onChange={() => null} />
        </li>
      </Pane>
    ))

    return (
      <SortablePane
        direction="vertical"
        margin={20}
        order={order}
        onOrderChange={onOrderChange}
        disableEffect={true}>
        {list}
      </SortablePane>
    );
  }
}

export default withRouter(SortableList)