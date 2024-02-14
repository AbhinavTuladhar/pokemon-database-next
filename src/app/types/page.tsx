import TypeCard from '@/components/TypeCard'
import TypeMultiplierBox from '@/components/TypeMultiplierBox'
// import TypeChartFull from '../components/TypeChartFull'

const TypeListing = () => {
  const typeList = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ]

  const typeCardList = typeList.map((type, index) => (
    <div key={index}>
      <TypeCard typeName={type} />
    </div>
  ))

  // For the chart key
  const chartKeyData = [
    { multiplier: 0, text: 'No effect (0%)' },
    { multiplier: 0.5, text: 'Not very effective (50%)' },
    { multiplier: 1, text: 'Normal (100%)' },
    { multiplier: 2, text: 'Super-effective (200%)' },
  ]

  // const chartKeyInfo = chartKeyData.map((row, rowIndex) => {
  //   const { multiplier, text } = row
  //   return (
  //     <div className="flex flex-row items-center gap-x-4" key={rowIndex}>
  //       <TypeMultiplierBox multiplier={multiplier} />
  //       <p> {text} </p>
  //     </div>
  //   )
  // })

  return (
    <div>
      <section>
        <h1 className="mb-8 flex justify-center text-center text-5xl font-bold">
          Pokémon types & type chart
        </h1>
        <h1 className="mb-10 flex justify-center text-center text-4xl font-bold">
          Type quick-list
        </h1>
        <div className="mb-4 flex flex-row flex-wrap justify-center gap-4">{typeCardList}</div>

        <h1 className="mb-4 text-3xl font-bold">Type Chart</h1>

        {/* <section className="flex flex-row flex-wrap justify-between">
          <div className="w-full mdlg:w-1/3">
            <p>
              The full type chart here displays the strengths and weaknesses of each type. Look down
              the left hand side for the attacking type, then move across to see how effective it is
              against each Pokémon type.
            </p>
            <div>
              <h1 className="my-4 text-2xl font-bold">Chart Key</h1>
              {chartKeyInfo}
            </div>
          </div>
          <div className="mt-4 flex w-full justify-center mdlg:mt-0 mdlg:w-2/3 mdlg:justify-end">
            <TypeChartFull />
          </div>
        </section> */}
      </section>
    </div>
  )
}

export default TypeListing
