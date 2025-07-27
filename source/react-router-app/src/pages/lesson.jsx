import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function getSearchParams(search) {
  const params = new URLSearchParams(search);
  return params;
}

export default function LessonPage() {
  
  const location = useLocation();
  
  const seachParams = useMemo(() => getSearchParams(location.search), [location.search]);

  console.log(seachParams.get('id'));

  return (
    <div>
      <h1>课程详情页</h1>
      <p>课程ID: </p>
    </div>
  );
}