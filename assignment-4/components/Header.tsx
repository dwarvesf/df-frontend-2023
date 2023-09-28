// import { HeaderProps } from '../types/Header.types'

const Header = (/*{ dark, handleSwitchTheme }: HeaderProps*/) => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-2 lg:px-4 py-2.5 dark:bg-gray-800 border-b">
        <div className="flex flex-wrap justify-between items-center  ">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bookstore
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <form className="relative inline-flex items-center">
              <input
                type="checkbox"
                // checked={dark}
                // onChange={handleSwitchTheme}
                className="sr-only peer cursor-pointer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full cursor-pointer peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 mr-5 text-sm font-medium text-gray-900 dark:text-gray-300">
                Light mode
              </span>
            </form>

            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-3 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              Tien Anh Luu
            </span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
