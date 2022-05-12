import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Aside } from '../Components/Aside'
import { Carte } from '../Components/Carte'
import { Header } from '../Components/Header'
import TrayProvider from '../contexts/TrayContext'

const ComponentPage: NextPage = () => {
  return (
    <Fragment>
      <TrayProvider>
      <div id="app">
        <section>
          <Header />
          <Carte />
        </section>
        <Aside />
      </div>
      </TrayProvider>
    </Fragment>
  )
}

export default ComponentPage
