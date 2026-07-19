import { Component } from 'react';

/** Falls back to `fallback` if a child (e.g. a broken .glb load) throws. */
export default class BagErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
