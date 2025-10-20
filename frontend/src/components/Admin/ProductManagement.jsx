import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminproductSlice';

const ProductManagement = () => {
  const dispatch= useDispatch();
  const { products, loading, error }= useSelector((state)=> state.adminProducts);

  useEffect(()=>{
    dispatch(fetchAdminProducts());
  }, [dispatch])
 
const handleDeleteItem = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
     // TODO: Add logic to actually delete the product from the list or send to backend
    //console.log(`Deleting product ${id}`);
    dispatch(deleteProduct(id));
  }  
};
if(loading) return <p>Loading ...</p>
if(error) return <p>Error: {error} ...</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="mb-4">
        <Link
          to="/admin/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-gray-500 border-gray-200">
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">SKU</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length >0 ?
                products.map((product) => (
                <tr key={product._id} className='hover:bg-gray-100 text-center border-b '>   
                    <td className="py-2 px-4 font-medium whitespace-nowrap">{product.name}</td>
                    <td className="py-2 px-4 ">RS. {product.price}</td>
                    <td className="py-2 px-4 ">{product.sku}</td>
                    <td className="py-2 px-4 ">
                        <Link 
                            to={`/admin/products/${product._id}`} 
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2">
                            Edit
                        </Link>

                        <button 
                            onClick={() => handleDeleteItem(product._id)}
                            className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
                                Remove
                        </button>
                    </td>
                </tr>
                )) : (
                    <tr>
                        <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                            No products found.
                        </td>
                    </tr>
                )
                }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductManagement
