import type {ReactNode} from 'react'
import type React from 'react'
import {Component} from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

const initialState: ErrorBoundaryState = {
  error: null,
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = initialState

  constructor(props: ErrorBoundaryProps) {
    super(props)
  }

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({error})

    const message = error instanceof Error ? error.message || error.toString() : ''
    // todo: send error
    console.error(`[Error Boundary] ${message}`, {
      error,
      additional: {info},
    })
  }

  render() {
    const {error} = this.state

    if (error) {
      return 'Something went wrong'
    }

    return this.props.children
  }
}
