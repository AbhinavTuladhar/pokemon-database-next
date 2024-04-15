import { FC, InputHTMLAttributes } from 'react'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      className="w-64 max-w-full rounded-lg px-2 py-2 text-black placeholder-gray-300"
      {...props}
    />
  )
}

export default Input
