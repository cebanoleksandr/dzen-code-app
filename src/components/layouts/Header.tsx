import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TopMenu } from '../UI/TopMenu';
import LogoutPopup from '../popups/LogoutPopup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchAC } from '../../store/searchSlice';

const Header = () => {
  const { item: search } = useAppSelector(state => state.search);
  const [query, setQuery] = useState(search);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSearch = () => {
    dispatch(setSearchAC(query));
    navigate('/search');
  }

  const onkeydownClick = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !!query.trim()) {
      onSearch();
    }
  }

  const onInputClear = () => {
    setQuery('');
    dispatch(setSearchAC(''));
    if (location.pathname === '/search') {
      navigate(-1);
    }
  };

  const onLogout = () => {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('userId', '');
    navigate('/login');
  }

  return (
    <header className='fixed left-52 right-0 top-0 z-[1] py-4 pr-12 pl-8 flex items-center justify-between bg-bg-base'>
      <div className='flex items-center gap-2'>
        <span className='relative'>
          <input
            type='text'
            className='px-9 py-2 w-96 border border-grey-3 rounded-lg text-app-sm focus:outline-primary'
            placeholder='Search'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onkeydownClick}
          />

          <MagnifyingGlassIcon className='w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary' />

          {!!query && (
            <XCircleIcon
              className='size-4 absolute text-primary-dark top-1/2 right-3 -translate-y-1/2 
              hover:text-grey-1 transition duration-300 cursor-pointer'
              onClick={onInputClear}
            />
          )}
        </span>
      </div>

      <div className='flex items-center gap-8'>
        <TopMenu />

        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 active:bg-red-600 transition duration-300'
          onClick={() => setIsLogoutPopupOpen(true)}
        >
          Logout
        </button>
      </div>

      <LogoutPopup
        state={isLogoutPopupOpen}
        setState={setIsLogoutPopupOpen}
        onLogout={onLogout}
      />
    </header>
  )
}

export default Header;
