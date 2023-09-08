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
    shopName: 'Zara',
    town: 'ASDFGHJKLL',
    startYear: '2000',
    description: 'ASDF',
    mainImgUrl: 'https://image.soidb.com/bangkok/zm/035135505_01.jpg',
  };

  // Yup'as
  const validationSchema = Yup.object({
    shopName: Yup.string().min(4).max(100).required('Shop name is required'),
    town: Yup.string().min(4).max(100).required('Town is required'),
    startYear: Yup.number()
      .required('Year is required'),
    description: Yup.string().required('Description is required'),
    mainImgUrl: Yup.string()
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
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
            <label htmlFor="mainImgUrl">Main Image URL</label>
            <input
              type="text"
              id="mainImgUrl"
              name="mainImgUrl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mainImgUrl}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.mainImgUrl && formik.errors.mainImgUrl
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.mainImgUrl && formik.errors.mainImgUrl && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.mainImgUrl}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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