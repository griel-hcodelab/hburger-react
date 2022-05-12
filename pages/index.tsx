import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Aside } from '../Components/Aside'
import { Carte } from '../Components/Carte'
import { Header } from '../Components/Header'
import { MetaTitle } from '../Components/Header/MetaTitle'
import TrayProvider from '../contexts/TrayContext'

const ComponentPage: NextPage = () => {
  return (
    <>
    <MetaTitle title="HBurger" />
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
    </>
  )
}

export default ComponentPage
