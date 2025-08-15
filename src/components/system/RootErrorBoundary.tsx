import { Component, type ReactNode } from 'react';

type State = { error?: Error };

export default class RootErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: unknown) {
    if (import.meta.env.DEV) console.error('App crash:', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div
        style={{
          padding: 24,
          maxWidth: 720,
          margin: '10vh auto',
          fontFamily: 'ui-sans-serif, system-ui',
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          The app hit a runtime error. Open the console for details.
        </p>
        {import.meta.env.DEV && (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#111827',
              color: '#e5e7eb',
              padding: 12,
              borderRadius: 8,
            }}
          >
            {String(this.state.error?.stack || this.state.error?.message)}
          </pre>
        )}
      </div>
    );
  }
}
