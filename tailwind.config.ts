import plugin from 'tailwindcss/plugin'

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'pokemon-detail-grid': 'repeat(auto-fill, minmax(min(350px, 90%), 1fr))',
        '2-flexible': 'repeat(auto-fill, minmax(min(420px, 90%), 1fr))',
        'card-list': 'repeat(auto-fill, minmax(min(210px, 90%), 1fr))',
        'competitive-grid-list': 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
        'sprite-table': 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
        'mini-sprite-table': 'repeat(auto-fill, minmax(90px, 1fr))',
        'pokemon-list': 'repeat(auto-fill, minmax(120px, 1fr))',
        'type-chart': 'auto repeat(18, 37px)',
        'dual-type-chart': 'auto 46px repeat(18, 37px)',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '1px 1px 2px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
  safelist: [
    'bg-greyYellow',
    'bg-gray-400',
    'bg-red-500',
    'bg-blue-400',
    'bg-amber-400',
    'bg-green-500',
    'bg-blue-300',
    'bg-red-600',
    'bg-purple-400',
    'bg-yellow-600',
    'bg-indigo-400',
    'bg-pink-400',
    'bg-green-600',
    'bg-yellow-800',
    'bg-purple-600',
    'bg-indigo-600',
    'bg-gray-700',
    'bg-gray-500',
    'bg-pink-300',

    'from-gray-400',
    'from-yellow-400',
    'from-red-500',
    'from-blue-400',
    'from-amber-400',
    'from-green-500',
    'from-blue-300',
    'from-red-600',
    'from-purple-400',
    'from-yellow-600',
    'from-indigo-400',
    'from-pink-400',
    'from-green-600',
    'from-yellow-800',
    'from-purple-600',
    'from-indigo-600',
    'from-gray-700',
    'from-gray-500',
    'from-pink-300',

    'to-gray-600',
    'to-yellow-400',
    'to-red-500',
    'to-blue-400',
    'to-amber-400',
    'to-green-500',
    'to-blue-300',
    'to-red-600',
    'to-purple-400',
    'to-yellow-600',
    'to-indigo-400',
    'to-pink-400',
    'to-green-600',
    'to-yellow-800',
    'to-purple-600',
    'to-indigo-600',
    'to-gray-700',
    'to-gray-500',
    'to-pink-300',

    'to-gray-400',
    'to-yellow-600',
    'to-red-700',
    'to-blue-600',
    'to-amber-600',
    'to-green-700',
    'to-blue-500',
    'to-red-800',
    'to-purple-600',
    'to-yellow-800',
    'to-indigo-600',
    'to-pink-600',
    'to-green-800',
    'to-yellow-950',
    'to-purple-800',
    'to-indigo-800',
    'to-gray-900',
    'to-gray-700',
    'to-pink-500',

    // For the coloured text
    'text-greyYellow',
    'text-gray-400',
    'text-red-500',
    'text-blue-400',
    'text-amber-400',
    'text-green-500',
    'text-blue-300',
    'text-red-600',
    'text-purple-400',
    'text-yellow-600',
    'text-indigo-400',
    'text-pink-400',
    'text-green-600',
    'text-yellow-800',
    'text-purple-600',
    'text-indigo-600',
    'text-gray-700',
    'text-gray-500',
    'text-pink-300',

    // For the type chart
    'bg-lime-600',
    'bg-lime-500',
    'bg-red-800',
    'bg-red-900',
  ],
}
