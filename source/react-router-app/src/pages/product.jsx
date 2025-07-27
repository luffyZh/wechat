import { useParams } from 'react-router-dom';

export default function ProductPage() {
  
  const params = useParams();

  console.log(params);

  return (
    <div>
      <h1>商品详情页</h1>
      <p>商品ID: {params.productId}</p>
    </div>
  );
}