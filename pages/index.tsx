import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Aside } from '../Components/Aside'
import { Carte } from '../Components/Carte'
import { Header } from '../Components/Header'

const Home: NextPage = () => {
  return (
    <Fragment>
      <div id="app">
        <section>
          <Header />

          <Carte />
      

        </section>
        <Aside />
      </div>


    </Fragment>
  )
}

export default Home
