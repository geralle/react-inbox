import React, { Component } from 'react';
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
const url = "https://geralle-inbox.herokuapp.com/api/messages"

class Inbox extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      selected: []
    }
  }

  componentDidMount(){
    this.getMessages()
  }

  async getMessages(){
    const response = await fetch(url)
    const json = await response.json()
    this.setState({data:json._embedded.messages})
  }

  async updatePage(payload, newData){
    const response = await fetch(url,{
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.setState({data: newData})
  }

  toggleStar(i){
    let position = Number(i - 1)
    let newData = this.state.data
    newData[position].starred = !newData[position].starred
    let payload = {
      "messageIds": [i],
      "command": "star",
      "star": newData[position].starred
    }
    this.updatePage(payload, newData)
  }

  checkBox(id){
    let newSelection = this.state.selected
    if(!newSelection.includes(id)){
      newSelection.push(id)
    }else{
      let exists = newSelection.indexOf(id)
      newSelection.splice(exists, 1)
    }
    this.setState({selected: newSelection})
  }

  render() {
    return (
      <div>
        <Toolbar
          data={this.state.data}
          selected={this.state.selected}
        />
        <Messages
          data={this.state.data}
          selected={this.state.selected}
          display={this.state.display}
          toggleStar={i => this.toggleStar(i)}
          checkBox={i => this.checkBox(i)}
        />
      </div>
    );
  }
}

export default Inbox;
