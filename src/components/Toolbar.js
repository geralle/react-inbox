import React, { Component } from 'react';

class Toolbar extends Component {
  unreadCount(){
    let count = 0
    for(let i=0;i<this.props.data.length;i++){
      if(this.props.data[i].read === false){
        count++
      }
    }
    return count
  }

  selectedBox(){
    if(this.props.selected.length === 0){
      return <i className="fa fa-square-o" onClick={(x) => this.props.selectAll(x)}></i>
    }else if (this.props.selected.length > 0 && this.props.selected.length < this.props.data.length) {
      return <i className="fa fa-minus-square-o" onClick={(x) => this.props.selectAll(x)}></i>
    }else if(this.props.selected.length === this.props.data.length){
      return <i className="fa fa-check-square-o" onClick={(x) => this.props.deselectAll(x)}></i>
    }
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.unreadCount()}</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default">
            {this.selectedBox()}
          </button>

          <button className="btn btn-default" onClick={(x) => this.props.markRead(x)}>Mark As Read</button>

          <button className="btn btn-default" onClick={(x) => this.props.markUnread(x)}>Mark As Unread</button>

          <select className="form-control label-select" onChange={(x,i) => this.props.applyLabel(x,i)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(x,i) => this.props.removeLabel(x,i)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;
