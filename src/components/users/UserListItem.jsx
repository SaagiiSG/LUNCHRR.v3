import React from 'react'

const UserListItem = ( props, {checking}, {checked}) => {
  const [user, setUser] = React.useState(checked)
  return (
    <tr className='even:bg-background even:bg-opacity-5 odd:bg-background odd:bg-opacity-15 w-full px-5'>
    <td className='h-14 text-lg font-md text-center w-[30%]'>{props.name}</td>
    <td className='h-14 text-lg font-md text-center w-[20%]'>{props.username}</td>
    <td className='h-14 text-lg font-md text-center w-[20%]'>{props.id}</td>
    <td className='h-14 text-lg font-md text-center w-[20%] '>{props.phone}</td>
    <td className='h-14 w-full flex items-center justify-center text-center pr-2'>
    <label class="flex items-center cursor-pointer relative">
      <input type="checkbox" checked={user} onChange={checking}  class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-pink-primary checked:border-slate-800" id="check" />
      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </span>
    </label>
    </td>
  </tr>
  )
}

export default UserListItem