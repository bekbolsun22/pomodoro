import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../pages/main/Main'
import { ROUTES } from '../utils/constants/routes'

const Login = React.lazy(() => import('../pages/login/Login'))
const NotFound = React.lazy(() => import('../pages/notFound/NotFound'))

export const AppRoutes = () => {
   return (
      <Suspense fallback={<h1>Here must Loading Spinner component</h1>}>
         <Routes>
            <Route path={ROUTES.MAIN.PATH} element={<Main />} />
            <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
            <Route path={ROUTES.NOTFOUND.PATH} element={<NotFound />} />
         </Routes>
      </Suspense>
   )
}
