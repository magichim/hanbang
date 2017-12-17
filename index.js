import React from 'react';

export class HanbangWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      route: window.location.pathname
    };
    this.change_route = this.change_route.bind(this);
  }

  componentDidMount () {
    if (window.history) {
      window.history.pushState({route: this.state.route}, '', this.state.route);
      window.addEventListener('popstate', (e)=> {
        this.setState({route: e.state.route});
      });
    }
  }

  change_route (path) {
    this.setState({
      route: path
    }, ()=> {
      if (window.history) {
        window.history.pushState({route: path}, '', path);
      }
    });
  }

  render () {
    return (
      <div>
        {
          React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {route: this.state.route, change_route: this.change_route});
          })
        }
      </div>
    );
  }
}

export class Hanbang extends HanbangWrapper {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
  }
  render () {
    if (this.props.path === this.props.route) {
      return (
        <this.props.component/>
      );
    }
    else {
      return false;
    }
  }
}

export class HanbangLink extends HanbangWrapper {
  constructor (props) {
    super(props);
    this._linkClick = this._linkClick.bind(this);
  }

  _linkClick (path) {
    this.props.change_route(path);
  }

  render () {
    return (
      <a onClick={(path)=> this._linkClick(this.props.to)}>
        {this.props.children}
      </a>
    );
  }
}