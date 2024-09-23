import Layout from '@Components/Layout'
import PublicLayout from '@src/Components/Layout/PublicLayout'
import React, { lazy } from 'react'

export interface RouteComponent {
  path: string
  exact?: boolean
  name: string
  icon?: string
  component: any
  layout: React.FunctionComponent
  needAuthentication: boolean
  title?: string
  subTitle?: string
}

//* lazy loading route

//* sign in
const Login = lazy(() => import('@src/Pages/Auth/Login').then(({ Login }) => ({ default: Login })))

//* home
const Home = lazy(() => import('@Pages/Home').then(({ Home }) => ({ default: Home })))

//* billing
const Billing = lazy(() => import('@Pages/Billing').then(({ Billing }) => ({ default: Billing })))

//* 404
const PageNotFound = lazy(() =>
  import('@Pages/PageNotFound').then(({ PageNotFound }) => ({
    default: PageNotFound,
  }))
)

const BillingRoute: RouteComponent = {
  path: '/billing',
  exact: true,
  name: 'billing',
  icon: '',
  component: Billing,
  layout: Layout,
  needAuthentication: true,
  title: 'Viện phí',
  subTitle: 'Dịch vụ cần thanh toán',
}

const HomeRoute: RouteComponent = {
  path: '/',
  exact: true,
  name: 'home',
  icon: '',
  component: Home,
  layout: Layout,
  needAuthentication: true,
  title: 'Trang chủ',
  subTitle: '',
}

const LoginRoute: RouteComponent = {
  path: '/login',
  exact: true,
  name: 'login',
  icon: '',
  component: Login,
  layout: PublicLayout,
  needAuthentication: false,
  title: '',
  subTitle: '',
}

const PageNotFoundRoute: RouteComponent = {
  path: '/404-page',
  exact: true,
  name: 'pageNotFound',
  component: PageNotFound,
  layout: Layout,
  needAuthentication: false,
}

export const routes = [
  LoginRoute,
  HomeRoute,
  BillingRoute,
  PageNotFoundRoute
]