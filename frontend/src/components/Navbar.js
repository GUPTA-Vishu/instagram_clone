import React, { useEffect, useRef, useState,useContext } from 'react';
import logo from './image/logo.png';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Navbar = ({login}) => {
	const {setModalOpen}=useContext(LoginContext);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [isToggleOpen, setisToggleOpen] = useState(false)
	const toggleBtn = () => {
		setisToggleOpen((toggleBtn) => !toggleBtn);
	}
	useEffect(() => {
		const handleResize = () => {
			windowSize.current = [window.innerWidth, window.innerHeight];
			if (windowSize.current[0] > 576) {
				setisToggleOpen(false);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const loginStatus = () => {
		const token=localStorage.getItem('jwt')
		if( login || token){
			return[
				<>
				<Link to="/profile">
					<li className='links'>Profile</li>
				</Link>

				<Link to="/createPost">
					<li className='links'>Create Post</li>
				</Link>

				<Link to={""}>
					<button className='logoutBtn' onClick={()=>setModalOpen(true)}>Log Out</button>
				</Link>
				</>
			]
		}
		else {
			return[
				<>
				<Link to="/signup">
					<li className='links'>Sign up</li>
				</Link>
				<Link to="/signin">
					<li className='links'>Sign in</li>
				</Link>
				</>
			]
		}
	};
	

	return (
		<div className='navbar'>

			<div>
				<Link style={{ display: 'inline-block' }} to={'/'}>
					<img src={logo} alt="" />
				</Link>
			</div>
			<ul className='nav-menu'>
				{loginStatus()};

			</ul>
			<div className='toggle_btn' onClick={toggleBtn}>
				<i className={`fa-solid fa-lg ${isToggleOpen ? "fa-xmark" : "fa-bars"}`}></i>
			</div>

			<div onClick={toggleBtn} className={`dropdown-menu ${isToggleOpen ? "open" : ""}`}>
				<Link to="/signup">
					<li className='links'>Sign up</li>
				</Link>
				<Link to="/signin">
					<li className='links'>Sign in</li>
				</Link>
				<Link to="/profile">
					<li className='links'>Profile</li>
				</Link>
                <Link to="/createPost">
					<li className='links'> Create Post</li>
				</Link>

			</div>
		</div>
	);
}

export default Navbar;
