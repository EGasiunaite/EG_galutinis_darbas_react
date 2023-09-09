import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

function AddShop() {
  const ctx = useAuth();
  const initialValues = {
    shopName: '',
    town: '',
    startYear: '',
    description: '',
    imgUrl: '',
  };

  // Yup'as
  const validationSchema = Yup.object({
    shopName: Yup.string().min(4).max(100).required('Shop name is required'),
    town: Yup.string().min(4).max(100).required('Town is required'),
    startYear: Yup.number()
    .required('Year is required')
    .min(1970, 'Year must be at least 1970')
    .max(2025, 'Year must be at most 2025'),
    description: Yup.string().required('Description is required'),
    imgUrl: Yup.string()
      .required('Main Image URL is required')
      .url('Invalid URL'),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
        const newAddObjWithUid = {
            ...values,
            userUid: ctx.userUid,
          };
          console.log('newAddObjWithUid ===', newAddObjWithUid);
          sendDataToFireBase(newAddObjWithUid);
        },
      });


  async function sendDataToFireBase(dataToSend) {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'shops'), dataToSend);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Shop created');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center mt-20">
        <h2 className="text-3xl font-semibold mb-4">Prideti parduotuve</h2>
        <form onSubmit={formik.handleSubmit}className="max-w-xs mx-auto">
           {/* shopName */}
           <div className="mb-4">
            <label htmlFor="shopName">Shop Name</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shopName}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.shopName && formik.errors.shopName
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.shopName && formik.errors.shopName && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.shopName}
              </div>
            )}
          </div>
           {/* town */}
           <div className="mb-4">
            <label htmlFor="town">Town</label>
            <input
              type="text"
              id="town"
              name="town"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.town}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.town && formik.errors.town
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.town && formik.errors.town && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.town}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Start Year */}
          <div className="mb-4">
            <label htmlFor="startYear">Start Year</label>
            <input
              type="number"
              id="startYear"
              name="startYear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startYear}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.startYear && formik.errors.startYear
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.startYear && formik.errors.startYear && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.startYear}
              </div>
            )}
          </div>

          {/* Main Image URL */}
          <div className="mb-4">
            <label htmlFor="imgUrl">Image URL</label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imgUrl}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.imgUrl && formik.errors.imgUrl
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.imgUrl && formik.errors.imgUrl && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.imgUrl}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShop