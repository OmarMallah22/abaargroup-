import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-arabic font-bold text-primary-blue mb-2">
                حدث خطأ غير متوقع
              </h1>
              <p className="text-primary-gray font-arabic leading-relaxed">
                نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={this.handleRefresh}
                className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-primary-sky-blue transition-colors duration-300 font-arabic font-bold flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 ml-2" />
                إعادة تحميل الصفحة
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full border-2 border-primary-blue text-primary-blue py-3 rounded-lg hover:bg-primary-blue hover:text-white transition-colors duration-300 font-arabic font-bold flex items-center justify-center"
              >
                <Home className="h-5 w-5 ml-2" />
                العودة للرئيسية
              </button>
            </div>
            
            {(import.meta.env.MODE === 'development' || import.meta.env.NODE_ENV === 'development') && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-primary-gray font-arabic">
                  تفاصيل الخطأ (للمطورين)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto text-red-600">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;