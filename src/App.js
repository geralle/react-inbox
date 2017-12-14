import React, { Component } from 'react';
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
import Compose from './components/Compose'
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
    let newData = json._embedded.messages
    for(let i=0;i<newData.length;i++){
      newData[i]['selected'] = false
    }
    this.setState({data:newData})
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

  toggleStar(id){
    let position = Number(id - 1)
    let newData = this.state.data
    newData[position].starred = !newData[position].starred
    let payload = {
      "messageIds": [id],
      "command": "star",
      "star": newData[position].starred
    }
    this.updatePage(payload, newData)
  }

  markRead(){
    let selections = this.state.selected
    let newData = this.state.data
    for(let i=0;i<selections.length;i++){
      for(let x=0;x<newData.length;x++){
        if(selections[i] === newData[x].id){
          newData[x].read = true
        }
      }
    }
    let payload = {
      "messageIds": selections,
      "command": "read",
      "read": true
    }
    this.updatePage(payload, newData)
  }

  markUnread(){
    let selections = this.state.selected
    let newData = this.state.data
    for(let i=0;i<selections.length;i++){
      for(let x=0;x<newData.length;x++){
        if(selections[i] === newData[x].id){
          newData[x].read = false
        }
      }
    }
    let payload = {
      "messageIds": selections,
      "command": "read",
      "read": false
    }
    this.updatePage(payload, newData)
  }

  checkBox(id){
    let newData = this.state.data
    let position = id - 1
    let newSelection = this.state.selected
    if(!newSelection.includes(id)){
      newSelection.push(id)
      newData[position]['selected'] = true
    }else{
      let exists = newSelection.indexOf(id)
      newSelection.splice(exists, 1)
      newData[position]['selected'] = false
    }
    this.setState({data: newData})
    this.setState({selected: newSelection})
  }

  selectAll(){
    let newData = this.state.data
    let selections = this.state.selected
    for(let i=0;i<newData.length;i++){
       let nextOne = i + 1
      if(!selections.includes(nextOne)){
        selections.push(nextOne)
      }
      newData[i]['selected'] = true
    }
    this.setState({selected:selections})
    this.setState({data:newData})
  }

  deselectAll(){
    let newData = this.state.data
    let selections = this.state.selected
    for(let i=0;i<newData.length;i++){
      selections.pop()
      newData[i]['selected'] = false
    }
    this.setState({selected:selections})
  }

  applyLabel(event){
    let selectedLabel = event.target.value
    let newData = this.state.data
    let selections = this.state.selected
    for(let i=0;i<selections.length;i++){
      for(let x=0;x<newData.length;x++){
        if(selections[i] === newData[x].id){
          if(!newData[x].labels.includes(selectedLabel)){
            newData[x].labels.push(selectedLabel)
          }
        }
      }
    }
    let payload = {
      "messageIds": selections,
      "command": "addLabel",
      "label": selectedLabel
    }
    this.updatePage(payload, newData)
  }

  removeLabel(event){
    let selectedLabel = event.target.value
    let newData = this.state.data
    let selections = this.state.selected
    for(let i=0;i<selections.length;i++){
      for(let x=0;x<newData.length;x++){
        if(selections[i] === newData[x].id){
          for(var j=0;j<newData[x].labels.length;j++){
            if(newData[x].labels[j] === selectedLabel){
              newData[x].labels.splice(j,1)
            }
          }
        }
      }
    }
    let payload = {
      "messageIds": selections,
      "command": "removeLabel",
      "label": selectedLabel
    }
    this.updatePage(payload, newData)
  }

  render() {
    return (
      <div>
        <Compose />
        <Toolbar
          data={this.state.data}
          selected={this.state.selected}
          selectAll={() => this.selectAll(this)}
          deselectAll={() => this.deselectAll(this)}
          markRead={() => this.markRead(this)}
          markUnread={() => this.markUnread(this)}
          applyLabel={(x,i) => this.applyLabel(x,this)}
          removeLabel={(x,i) => this.removeLabel(x,this)}
        />
        <Messages
          data={this.state.data}
          selected={this.state.selected}
          display={this.state.display}
          toggleStar={id => this.toggleStar(id)}
          checkBox={id => this.checkBox(id)}
        />
      </div>
    );
  }
}

export default Inbox;
