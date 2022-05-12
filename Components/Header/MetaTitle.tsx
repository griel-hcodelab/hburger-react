import Head from "next/head"

export const MetaTitle = ({title}:{title: string}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
