
import { CiHome, CiSearch } from 'react-icons/ci';
import { FaChevronRight, FaRegMoon, FaRegSun } from 'react-icons/fa';
import { MdHistory, MdLogout } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiQrScan } from 'react-icons/bi';
import { IoLanguage } from 'react-icons/io5';

function Navbar() {
  return (
  
    <nav className="sidebar  close">
        <header>
            <div className="image-text">
                <span className="image">
                    <img src="next.svg" alt="logo"/>
                </span>
    
                <div className="text header-text">
                    <span className="name">
                        Mees
                    </span>
                </div>
            </div>
            <FaChevronRight className="toggle" />         
        </header>
        <div className="menu-bar">
            <div className="menu">
                <li className="search-box">
                  <CiSearch className='icon' />
                    <input type="search" placeholder="Search"/>       
                </li>
                <ul className="menu-links">
                    <li className="nav-links">
                        <a href="/" className="" id="">
                            <CiHome className="icon" />
                            
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>


                    <li className="nav-links">
                        <a href="" className="" id="">
                            <MdHistory className="icon"/>
                            <span className="text nav-text">History</span>
                        </a>
                    </li>


                    <li className="nav-links">
                        <a href="/upload" className="" id="">
                            <AiOutlineCloudUpload  className='icon'/>
                            <span className="text nav-text">Uploads</span>
                        </a>
                    </li>

                    <li className="nav-links">
                        <a href="/ocr" className="" id="">
                            <BiQrScan className="icon" />
                            <span className="text nav-text">Ocr</span>
                        </a>
                    </li>

                    <li className="nav-links">
                        <a href="" className="" id="">
                            <IoLanguage className='icon'/>
                            <span className="text nav-text">Traduction</span>
                        </a>
                    </li>           
                </ul>
            </div>

            <div className="bottom-content">
                <li className="nav-links">
                    <a href="" className="" id="">
                        <MdLogout className="icon" />
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>

                <li className="mode">
                    <div className="moon-sun">
                      {/* <FaRegMoon className="icon moon"/>
                      <FaRegSun className="icon sun" /> */}
                    </div>

                    <span className="mode-text text">Dark Mode</span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>
    
  )
}

export default Navbar