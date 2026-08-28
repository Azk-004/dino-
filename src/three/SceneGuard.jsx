import { Component, useMemo } from 'react';

export function detectWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function useWebGL() {
  return useMemo(() => detectWebGL(), []);
}

export class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.info(`PANOTIK_BOUNDARY=${this.props.name ?? 'scene'}`);
      console.info(`PANOTIK_ERROR=${error && error.message}`);
      console.info(`PANOTIK_STACK=${info && info.componentStack}`);
    }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}