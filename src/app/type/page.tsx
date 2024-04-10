import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import TypeCard from '@/components/TypeCard'
import TypeChartFull from '@/components/TypeChartFull'
import TypeMultiplierBox from '@/components/TypeMultiplierBox'
import typeList from '@/data/typeList'

export const metadata: Metadata = {
  title: 'Pokémon Types | Pokémon Database',
}

const TypeListing = () => {
  const typeCardList = typeList.map((type, index) => (
    <div key={index}>
      <TypeCard typeName={type} variant="small" />
    </div>
  ))

  // For the chart key
  const chartKeyData = [
    { multiplier: 0, text: 'No effect (0%)' },
    { multiplier: 0.5, text: 'Not very effective (50%)' },
    { multiplier: 1, text: 'Normal (100%)' },
    { multiplier: 2, text: 'Super-effective (200%)' },
  ]

  const chartKeyInfo = chartKeyData.map((row, rowIndex) => {
    const { multiplier, text } = row
    return (
      <div className="flex flex-row items-center gap-x-4" key={rowIndex}>
        <TypeMultiplierBox multiplier={multiplier} />
        <p> {text} </p>
      </div>
    )
  })

  return (
    <main>
      <PageTitle>Pokémon types & type chart</PageTitle>
      <section>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr,_2fr]">
          <div>
            <h2 className="mb-4 flex justify-center text-center text-4xl font-bold">
              Type quick-list
            </h2>
            <div className="mb-4 flex flex-row flex-wrap justify-center gap-2">{typeCardList}</div>
            <h2 className="mb-4 text-4xl font-bold">Type Chart</h2>
            <p>
              The full type chart here displays the strengths and weaknesses of each type. Look down
              the left hand side for the attacking type, then move across to see how effective it is
              against each Pokémon type.
            </p>
            <div>
              <h3 className="my-4 text-2xl font-bold">Chart Key</h3>
              {chartKeyInfo}
            </div>
          </div>
          <div className="mt-4 flex w-full justify-center lg:justify-end">
            <TypeChartFull />
          </div>
        </section>
      </section>
    </main>
  )
}

export default TypeListing
