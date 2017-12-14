import React, { Component } from 'react';
import Message from './Message'

class Messages extends Component {

  mapData(){
    return this.props.data.map((message,index) => {
      return <Message
        message={message.subject}
        selected={message.selected}
        starred={message.starred}
        read={message.read}
        labels={message.labels}
        id={message.id}
        key={message.id}
        toggleStar={id => this.props.toggleStar(id)}
        checkBox={id => this.props.checkBox(id)}
      />
    })
  }

  render() {
    return (
      <div>
        {this.mapData()}
      </div>
    );
  }
}

export default Messages;
