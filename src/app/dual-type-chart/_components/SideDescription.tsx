import React from 'react'

import { SectionTitle } from '@/components/containers'

export const SideDescription = () => {
  return (
    <>
      <section>
        <SectionTitle> Chart Info </SectionTitle>
        <p>
          The huge chart here shows the strengths and weaknesses of each dual-type, along with the
          number of Pokémon have that type. It looks complex but it&apos;s fairly straightforward to
          use - the type of the attack move is along the top row. Follow that down to the
          corresponding row to see how effective it is. The total number of Pokémon with each type
          are listed; click a number in that column to see a list of the actual Pokémon of that type
          combo.
        </p>
      </section>
      <section>
        <h2 className="my-4 text-3xl font-bold"> Cumulative score</h2>
        <p>
          This is calculated by adding up each effectiveness for a type combo: 1 for neutral damage,
          2 for super-effective, 0.25 for a double resistance and so on. Lower numbers are
          statistically better; a completely neutral Pokémon would score 18 (1 for each type).
        </p>
      </section>
    </>
  )
}
