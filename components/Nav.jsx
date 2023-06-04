'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { set } from 'mongoose';

const Nav = () => {
 const isUserLoggedIn = true;
 const [providers, setProviders] = useState(null);
 const [toggleDropDown, setToggleDropDown] = useState(false);
 useEffect(() => {
  const setProviders = async () => {
   const response = await getProviders();

   setProviders(response);
  };

  setProviders();
 }, []);

 return (
  <nav className='w-full pt-3 mb-16 flex-between '>
   <Link href='/' className='flex gap-2 flex-center'>
    <Image
     src='/assets/images/logo.svg'
     alt='Promptopia logo'
     width={30}
     height={30}
     className='object-contain'
    />
    <p className='logo_text'>Promptopia</p>
   </Link>

   {/* Mobile Navigation */}
   <div className='hidden sm:flex '>
    {isUserLoggedIn ? (
     <div className='flex gap-3 md:gap-5'>
      <Link href='/create-prompt' className='black_btn'>
       Create Post
      </Link>

      <button type='button' onClick={signOut} className='outline_btn'>
       Sign Out
      </button>

      <Link href='/profile'>
       <Image
        src='/assets/images/profile.svg'
        alt='profile'
        width={37}
        height={37}
        className='rounded-full'
       />
      </Link>
     </div>
    ) : (
     <>
      {providers &&
       Object.values(providers).map((provider) => (
        <button
         type='button'
         key={provider.name}
         onClick={() => signIn(provider.id)}
        >
         Sign In
        </button>
       ))}
     </>
    )}
   </div>

   {/* Mobile Navigation */}
   <div className='relative flex sm:hidden'>
    {isUserLoggedIn ? (
     <div className='flex'>
      <Image
       src='/assets/images/logo.svg'
       alt='profile'
       width={37}
       height={37}
       className='rounded-full'
       onClick={() => setToggleDropDown((prev) => !prev)}
      />

      {toggleDropDown && (
       <div className='dropdown'>
        <Link
         href='/profile'
         className='dropdown_link'
         onClick={() => setToggleDropDown(false)}
        >
         My Profile
        </Link>
        <Link
         href='/create-prompt'
         className='dropdown_link'
         onClick={() => setToggleDropDown(false)}
        >
         Create Prompt
        </Link>

        <button
         type='button'
         onClick={() => {
          setToggleDropDown(false);
          signOut();
         }}
         className='w-full mt-5 black_btn'
        >
         Sign Out
        </button>
       </div>
      )}
     </div>
    ) : (
     <>
      {providers &&
       Object.values(providers).map((provider) => (
        <button
         type='button'
         key={provider.name}
         onClick={() => signIn(provider.id)}
        >
         Sign In
        </button>
       ))}
     </>
    )}
   </div>
  </nav>
 );
};

export default Nav;
