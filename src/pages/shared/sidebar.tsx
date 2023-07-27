import { forwardRef, LegacyRef, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router";
import logo from "../../images/miniso1.png";
import { MdCottage, MdGroup, MdShopTwo, MdCategory } from 'react-icons/md'
import { useEffect } from "react";
import { useSelector } from 'react-redux'


const SideBar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const { token: tokenReducer, message, status, refresh } = useSelector((state:any) => state.LoginReducers);
  const [listMenu, setListMenu]=useState([{ to: '/', path: '/', icon:<MdCottage/>, name:'Home'}])
  let token:any;
  useEffect(()=>{
    token = localStorage.getItem('AuthToken')

    console.log("TOKENNNNNN", token);
        
    token ? 
      setListMenu([
      { to: '/', path: '/', icon:<MdCottage/>, name:'Home'},
      { to: '/user', path: '/user', icon:<MdGroup/>, name:'User'},
      { to: '/category', path: '/category', icon:<MdCategory/>, name:'Category'},
      { to: '/product', path: '/product', icon:<MdShopTwo/>, name:'Product'}
      ]) : setListMenu([{ to: '/', path: '/', icon:<MdCottage/>, name:'Home'}])
      
    console.log(listMenu);
  },[])
    const router = useRouter()
   
  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
          <Image
            className="w-32 h-auto"
            src={logo}
            alt="company logo"
          />
      </div>

      <div className="flex flex-col">
        {(listMenu || []).map((mn)=>(
          <Link href={`${mn.to}`}>
              <div
                  className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == mn.path
                      ? "bg-red-100 text-red-700"
                      : "text-gray-400 hover:bg-red-100 hover:text-red-700"
                  }`}
              >
                  <div className="mr-2">
                      {mn.icon}
                  </div>
                  <div>
                      <p>{mn.name}</p>
                  </div>
              </div>
          </Link>)
        )}
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
