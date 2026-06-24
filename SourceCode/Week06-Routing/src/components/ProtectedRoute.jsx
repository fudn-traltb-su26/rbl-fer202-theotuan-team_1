// Tuần 6: Protected Route — chặn truy cập nếu chưa có quyền
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectTo = '/', children }) {
  // Nếu không có quyền → redirect về trang khác
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
    // replace: không lưu vào history (nhấn Back sẽ không quay lại đây)
  }

  // Có quyền → render children bình thường
  return children;
}

export default ProtectedRoute;
