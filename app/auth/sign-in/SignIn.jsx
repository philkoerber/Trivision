'use client'

import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function SignIn(props) {
  const supabase = createClientComponentClient()

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      console.log(error.message)
    } else {
      console.log('Success! Loggin in....')
    }
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='w-96 p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Sign Up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }
            if (!values.password) {
              errors.password = 'Password is required'
            }
            return errors
          }}
          onSubmit={signIn}
        >
          <Form className='flex flex-col space-y-4 rounded-lg backdrop-blur-xl p-8'>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-gray-100 font-medium'>
                Email
              </label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='jane@example.com'
                className='mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-gray-400'
              />
              <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1' />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='password' className='text-gray-100 font-medium'>
                Password
              </label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-gray-400'
              />
              <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1' />
            </div>

            <button
              type='submit'
              className='bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-400'
            >
              Sign In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignIn
