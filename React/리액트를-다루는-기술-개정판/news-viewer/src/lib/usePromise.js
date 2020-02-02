import { useState, useEffect } from "react";

const usePromise = (promiseCreator, deps) => {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const process = async () => {
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    process();
  }, deps);

  return [loading, resolved, error];
};

export default usePromise;
