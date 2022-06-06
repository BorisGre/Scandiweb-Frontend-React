import React, { useEffect, useState, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { localStorageReadRaw, localStorageWrite } from './helpers/localStorageHelper';
import Footer from './components/footer/footer';
import Products from './views/ProductsPage/Products';
import ProductAdd from './views/ProductAdd/ProductAdd';

function App({storageID}) {
    const windowRef = useRef(window);
    let maxScroll = 0;
    const maxScrollRef = useRef(maxScroll);
    /*const [PopUpShowed, setPopUpFlag] = useState(false)
    const popUpProps = {showHideHandler: setPopUpFlag, PopUpShowed} 

    const reduxState = useSelector(state => state)
    
     useEffect(() => {
        const localStorageState = localStorageReadRaw(storageID)
        const strRedux = JSON.stringify(reduxState)
            if(strRedux !== localStorageState){
                localStorageWrite(storageID, reduxState)          
            }
       
    }, [storageID, reduxState])*/
    const [productsObj, setProducts] = useState({current: 0, next: true, products: []})
    const [nextPage, setLoadNextPage] = useState(true)
    const [debounce, setDebounce] = useState(false)
    const debounceTime = 2000//ms

    const infinityLoad = function(e){// print "false" if direction is down and "true" if up

        console.log(this.scrollY, this.outerHeight, this.innerHeight, this.outerHeight - this.innerHeight, maxScroll)

        //if((this.oldScroll < this.scrollY) && ((this.scrollY - this.oldScroll) >= (this.outerHeight*0.15))){
        if(this.oldScroll < this.scrollY && this.scrollY >= maxScrollRef.current){
            if(debounce === false){
                console.log(`scroll down, debounce`, debounce, nextPage)
                setLoadNextPage(true)
                setDebounce(true)
           }
           maxScrollRef.current = this.scrollY >= maxScrollRef.current ? this.scrollY : maxScrollRef.current
        } 

     this.oldScroll = this.scrollY;
    }

    windowRef.current.onscroll = infinityLoad

    const scrollToEnd = () => { 
        const ref = window; 
        console.log(`scroll TO`, maxScrollRef.current, (ref.outerHeight - ref.innerHeight))
        ref.scroll(0, maxScroll-(ref.outerHeight - ref.innerHeight))
    }

    const scrollToTop = () => { windowRef.current.scroll(0, 0) }

    useEffect(() => {

        if(debounce){
            console.log(`debounce setTimeout`, debounce) 
            setTimeout(() => { console.log(`timeout`); setDebounce(false)}, debounceTime)
          }
        }  
        ,[debounceTime, setDebounce, debounce]
    );

    const productProps = {productsObj, setProducts, nextPage, setLoadNextPage, scrollToTop, scrollToEnd}

    return (
            <main className="rootApp">
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Products {...productProps}/>}>
                        <Route index element={<Products {...productProps}/>}/>
                    </Route>
                    <Route path="/addproduct" element={<ProductAdd/>}></Route>
                </Routes>
                </BrowserRouter>
                <Footer/> 
            </main>
    );
}

export default App;