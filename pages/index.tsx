import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Aside } from '../Components/Aside'
import Carte from '../Components/Carte'
import { Header } from '../Components/Header'
import { MetaTitle } from '../Components/Header/MetaTitle'
import TrayContext from '../Context/TrayContext'
import AuthContext from '../Context/AuthContext'
import TrayItemsContext, { useTrayItems } from '../Context/TrayItemsContext'

const ComponentPage: NextPage = () => {
  return (
    <>
    <MetaTitle title="HBurger" />
      <TrayContext>
        <TrayItemsContext>
        <section>
          <Header />
          <Carte />
        </section>
        <Aside />
        </TrayItemsContext>
      </TrayContext>
    </>
  )
}

export default ComponentPage
