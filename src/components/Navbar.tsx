import style from './Navbar.module.css';
import {Dropdown} from 'flowbite-react';
import { useEffect, useState } from "react";
function Navbar() {
    
    const [superHero, setSuperHero] = useState<string>("") ;

    const location = window.location.href;
    useEffect(() => {
        if(location) {
            const re = "%20"
            let tmp = location.slice(location.lastIndexOf("/") , location.length).substring(1).replace(re," ");
            tmp = tmp.replace(re, " ")
            setSuperHero(tmp) ;
        }
    }, [location])

    return <>
        <div className={style.navbar}>
            <div className={style.container}>
                <p>Super Friends</p>
                {superHero == "" ? <p>Byte The Dog</p>: <p className={style.name}>{superHero}</p>}
                <div className={style.links}>
                <Dropdown className={style.dropdown} label="DC" placement="bottom" size="sm" inline={true} arrowIcon={false}>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Superman'}>Superman</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Batman'}>Batman</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'The Flash'}>The Flash</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Wonder Woman'}>Wonder Women</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Green Latern'}>Green Latern</Dropdown.Item>
                </Dropdown>
                |
                <Dropdown className={style.dropdown} label="Marvel" placement="bottom" size="sm" inline={true} arrowIcon={false}>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Spiderman'}>Spiderman</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Iron Man'}>Iron Man</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'The Hulk'}>The Hulk</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Thor'}>Thor</Dropdown.Item>
                    <Dropdown.Item  className={style.item} onClick={()=> window.location.href = 'Captain America'}>Captain America</Dropdown.Item>
                </Dropdown>
                |
                <button className={style.dropdown} onClick={()=> window.location.href='Byte The Dog'}>Byte</button>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;