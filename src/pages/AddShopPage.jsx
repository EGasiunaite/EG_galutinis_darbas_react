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
    logoImg: '',
    phoneNumber: '',
    website: '',
    workingHours: '',
    shopImg: '',
  };

 // Yup'as
const validationSchema = Yup.object({
  shopName: Yup.string()
    .min(4, 'Shop name must be at least 4 characters')
    .max(100, 'Shop name must be at most 100 characters')
    .required('Shop name is required'),
  town: Yup.string()
    .min(4, 'Town must be at least 4 characters')
    .max(100, 'Town must be at most 100 characters')
    .required('Town is required'),
  startYear: Yup.number()
    .required('Year is required')
    .min(1970, 'Year must be at least 1970')
    .max(2025, 'Year must be at most 2025'),
  description: Yup.string().required('Description is required'),
  logoImg: Yup.string()
    .required('Main Image URL is required')
    .url('Invalid URL'),
  phoneNumber: Yup.number(),
  website: Yup.string()
    .url('Invalid URL'),
  workingHours: Yup.string()
    .min(4, 'Working hours must be at least 4 characters')
    .max(100, 'Working hours must be at most 100 characters'),
  shopImg: Yup.string()
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
      toast.error('Oups. Something went wrong');
    }
  }

  return (
<div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center mt-20 mb-20 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl font-semibold mb-4">Add a shop</h2>
        <div className="flex flex-wrap">
          {/* Left Column */}
          <div className="w-full sm:w-1/2 p-2">
            <form onSubmit={formik.handleSubmit}>
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
              {/* Logo Image URL */}
              <div className="mb-4">
                <label htmlFor="logoImg">Logo URL</label>
                <input
                  type="text"
                  id="logoImg"
                  name="logoImg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.logoImg}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formik.touched.logoImg && formik.errors.logoImg
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {formik.touched.logoImg && formik.errors.logoImg && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.logoImg}
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Right Column */}
          <div className="w-full sm:w-1/2 p-2">
            <form onSubmit={formik.handleSubmit}>
              {/* phoneNumber */}
              <div className="mb-4">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>
              {/* website */}
              <div className="mb-4">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formik.touched.website && formik.errors.website
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {formik.touched.website && formik.errors.website && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.website}
                  </div>
                )}
              </div>
              {/* workingHours */}
              <div className="mb-4">
                <label htmlFor="workingHours">Working Hours</label>
                <input
                  type="text"
                  id="workingHours"
                  name="workingHours"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.workingHours}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formik.touched.workingHours && formik.errors.workingHours
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {formik.touched.workingHours && formik.errors.workingHours && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.workingHours}
                  </div>
                )}
              </div>
              {/* shopImg */}
              <div className="mb-4">
                <label htmlFor="shopImg">Shop Image URL</label>
                <input
                  type="text"
                  id="shopImg"
                  name="shopImg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shopImg}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    formik.touched.shopImg && formik.errors.shopImg
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                {formik.touched.shopImg && formik.errors.shopImg && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.shopImg}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4">
        <button
            type="submit"
            className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-500 w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddShop