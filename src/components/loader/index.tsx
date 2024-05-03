import Image from 'next/image'

const Loader = () => {
  return (
    <div className="mt-[30vh] flex flex-col items-center justify-center gap-y-4">
      <Image
        src="/pokeball-icon.svg"
        width={60}
        height={60}
        alt="pokeball"
        className="animate-spin"
      />
      <span className="text-xl font-bold"> Loading... </span>
    </div>
  )
}

export default Loader
