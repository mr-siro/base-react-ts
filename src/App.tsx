import React, { ComponentType, ReactElement, Fragment, Suspense, useEffect } from 'react'
import './App.css'
import { Routes, Route, PathRouteProps, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Loading } from '@Components/Loading'
import { routes } from './Routes'
import { Notification } from '@Components/Notification/Notification'
import { useAppSelector } from './App/Store'

interface Props extends PathRouteProps {
  layout: React.FunctionComponent<any>
  component: ComponentType
  title?: string
  subTitle?: string
  icon?: string
  needAuthentication?: boolean
}

const routeWrapper = (
  Layout: Props['layout'],
  Component: Props['component'],
  title: Props['title'],
  subTitle: Props['subTitle'],
  icon: Props['icon'],
  needAuthentication: Props['needAuthentication']
): ReactElement => {
  const { accessToken, status } = useAppSelector(state => state.auth);
  const isAuthenticated = !!accessToken && status === 'active';
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if (needAuthentication && !isAuthenticated) {
      navigate('/login');
    }
  }, [needAuthentication, isAuthenticated]);

  useEffect(() => {
    console.clear()
    window.scrollTo(0, 0)
  }, [location])

  return (
    // https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
    <Layout title={title} subTitle={subTitle} icon={icon}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </Layout>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Fragment>
          <>
            {routes.map((route) => (
              <Route
                key={route.name}
                path={route.path}
                element={routeWrapper(
                  route.layout,
                  route.component,
                  route.title,
                  route.subTitle,
                  route.icon,
                  route.needAuthentication
                )}
              />
            ))}
            <Route path="*" element={<Navigate to="/404-page" />} />
          </>
        </Fragment>
      </Routes>
      <Notification />
    </>
  )
}

export default App
