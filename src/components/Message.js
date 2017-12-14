import React, { Component } from 'react';

class Inbox extends Component {
  displayStar(){
    if(this.props.starred === true){
      return 'fa-star'
    }else if (this.props.starred === false) {
      return 'fa-star-o'
    }
  }

  readUnread(){
    if(this.props.read === true){
      return 'read'
    }else if (this.props.read === false) {
      return 'unread'
    }
  }

  selected(){
    if(this.props.selected === true){
      return 'selected'
    }else if(this.props.selected === false){
      return ''
    }
  }

  displayCheck(){
    if(this.props.selected === true){
      return 'check'
    }else if(this.props.selected === false){
      return ''
    }
  }

  addLabels(){
    return this.props.labels.map((label,index)=>{
      return <span className="label label-warning" key={index}>{label}</span>
    })
  }

  render() {
    return (
      <div className={"row message " + this.readUnread() + ' ' + this.selected()}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.displayCheck()} onClick={() => this.props.checkBox(this.props.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={"star fa " + this.displayStar()} onClick={() => this.props.toggleStar(this.props.id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.addLabels()}
          <a href="#">
            {this.props.message}
          </a>
        </div>
      </div>
    );
  }
}

export default Inbox;
