"use client"

import { getSession, useSession } from "@node_modules/next-auth/react"
import Link from "@node_modules/next/link"
import Image from 'next/image'
import { useState, useEffect } from "react"
import { signOut } from "@node_modules/next-auth/react"
import { useRouter } from "@node_modules/next/navigation"

const Nav = ({ userInput }) => {

  const [searchRecipe, setSearchRecipe] = useState('')
  const [recipeType, setRecipeType] = useState('all')
  const { data: session, status } = useSession()
  const router = useRouter()

  const submitSearchRecipe = async (event) => {
    event.preventDefault()
    router.replace(`/search_result/${recipeType}/${searchRecipe}`)

  }

  const handleRecipeType = (event) => {
    setRecipeType(event.target.value)
  }




  if (session === undefined) {
    return (

      <div>
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  if (session === null || session === undefined || status === 'unauthenticated') {

    return (

      <div className="navbar bg-base-100 shadow-sm p-6">
        <div className="navbar-start">
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>





            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
              
            </ul>
          </div> */}
          <Link href="/" className="btn btn-ghost text-xl">SuitLub</Link>

        </div>


        {/*Mobile*/}

        <div className="navbar-end  md:hidden">

          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
        </div>



        {/* Desktop */}
        <div className="navbar-end hidden md:flex">
          <form onSubmit={submitSearchRecipe} className="flex items-center rw-24 md:w-96 md:mx-2">
            <input onChange={({ target }) => setSearchRecipe(target.value)} value={searchRecipe} type="text" placeholder="Search recipe..." className="input input-bordered w-24 md:w-96 md:mx-2" />
            <select onChange={handleRecipeType} value={recipeType} className="select mx-2">
              <option value="all">All</option>
              <option value="main dish">Main Dish</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
            <button type="submit" className="btn btn-outline btn-accent">search</button>
          </form>

          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>

            </ul>
          </div>



        </div>

      </div>

    )
  }

  if (session !== null) {
    
    return (


      /* <Link href="/">Home</Link> User: <Link href={`/protected/profile/${session?.user?.id}`}>{session?.user?.name}</Link> <Link href="/create_recipe">Create Recipe</Link> <Link href="/create_ingredient">Create Ingredient</Link> <button onClick={() => signOut()}>sign out</button> */


      <div className="navbar bg-base-100 shadow-sm p-6">
        <div className="navbar-start">
          
          <Link href="/" className="btn btn-ghost text-xl">Suitlab</Link>

        </div>


        {/*Mobile*/}

        <div className="navbar-end  md:hidden">

          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                  <Link href={`/protected/profile/${session?.user?.id}`} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link href="/protected/create_recipe">Create recipe</Link></li>
                <li><button onClick={() => signOut()}>Logout</button></li>
            </ul>
          </div>
        </div>



        {/* Desktop */}
        <div className="navbar-end hidden md:flex">

          <form onSubmit={submitSearchRecipe} className="flex items-center rw-24 md:w-96 md:mx-2">
            <input onChange={({ target }) => setSearchRecipe(target.value)} value={searchRecipe} type="text" placeholder="Search recipe..." className="input input-bordered w-24 md:w-96 md:mx-2" />
            <select onChange={handleRecipeType} value={recipeType} className="select mx-2">
              <option value="all">All</option>
              <option value="main dish">Main Dish</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
            <button type="submit" className="btn btn-outline btn-accent">search</button>
          </form>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://ucarecdn.com/1d37c0cc-0a69-4493-909f-bf1d4bcd3a52/default_user_image.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={`/protected/profile/${session?.user?.id}`} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link href="/protected/create_recipe">Create recipe</Link></li>
                <li><button onClick={() => signOut()}>Logout</button></li>
              </ul>
            </div>
          </div>



        </div>
      </div>
    )
  }

  return (
    <div className="navbar bg-base-100 shadow-sm p-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>





            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">Suitlab</Link>

        </div>


        {/*Mobile*/}

        <div className="navbar-end  md:hidden">

          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><a>Link</a></li>
              <li><a>Link</a></li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li><a>Link 1</a></li>
                    <li><a>Link 2</a></li>
                    <li><a>Link 3</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>



        {/* Desktop */}
        <div className="navbar-end hidden md:flex">

          <form onSubmit={submitSearchRecipe} className="flex items-center rw-24 md:w-96 md:mx-2">
            <input onChange={({ target }) => setSearchRecipe(target.value)} value={searchRecipe} type="text" placeholder="Search recipe..." className="input input-bordered w-24 md:w-96 md:mx-2" />
            <select onChange={handleRecipeType} value={recipeType} className="select mx-2">
              <option value="all">All</option>
              <option value="main dish">Main Dish</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
            <button type="submit" className="btn btn-outline btn-accent">search</button>
          </form>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://ucarecdn.com/1d37c0cc-0a69-4493-909f-bf1d4bcd3a52/default_user_image.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={`/protected/profile/${session?.user?.id}`} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link href="/protected/create_recipe">Create recipe</Link></li>
                <li><button onClick={() => signOut()}>Logout</button></li>
              </ul>
            </div>
          </div>



        </div>
      </div>

  )
}

export default Nav