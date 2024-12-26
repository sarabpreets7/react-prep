import { useEffect,useState } from "react";
import './pagination.css'


export default function PaginatedPage(){

    const [currPage,setPage] = useState(1);
    const [userList,setUserList] = useState([]);
    const [pages,setPages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [limit,setLimit] = useState(10);
    const [limitOptions,setLimitOptions] = useState([2,5,10]);
    const [skip,setSkip] = useState(0);
    const [total,setTotal] = useState(0);


    useEffect(()=>{

    fetchData();
    // setLimits();

    },[limit,skip])

    useEffect(()=>{
        getPageNumbers();
        console.log(userList,'listt');
    },[userList])

    const getPageNumbers=()=>{
        let totalPages = Math.ceil(userList.length/limit);
        let pages = [];
        for(let i=0;i<total;i++){
            pages.push(i+1);
        }
        setPages(pages);

    }
  
    const fetchData =async()=>{

        setLoading(true)
        try{
            let response = await fetch(`http://dummyjson.com/users?limit=${limit}&skip=${skip}`);
            let data = await response.json();
            setUserList(data.users);
            setTotal(data.total);
            
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false)
        }
        
    }
    const nextPage =()=>{
        let newSkip = limit + skip;
        console.log(newSkip,'new1');
        setSkip(newSkip)
    }
    const prevPage = ()=>{
        let newSkip = skip - limit;
        console.log(newSkip,'new2');
        if(newSkip>=0){
            setSkip(newSkip)
        }
    }
    const changeLimit = (e) =>{
        console.log(e);
        setLimit(parseInt(e.target.value))
        setSkip(0);
    }
  

    return(
        <>
        {loading && <h1>Loading...</h1>}
        <div className="main__container">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                    </tr>
                
            
                        {userList.slice((currPage*10) - 10,currPage*10).map((user)=>{
                            return(
                                <tr  key={user.id}>
                                    {/* <h1>{item.title}</h1>
                                    <img alt={item.title} style={{width:'150px'}} src={item.image}></img>
                                    <span>{item.price},{item.description}</span> */}
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            )
                        })}

                </table>
                    <div style={{marginTop:'50px'}}>
                       
                        {/* {pages.slice(skip,limit).map((pageNo,idx)=>{
                            return(
                                <span onClick={()=>setPage(pageNo)} style={{marginRight:'10px',background:currPage==pageNo?'lightGray':''}} key={pageNo+1}>{pageNo}</span>

                            )
                        })} */}
                       
                    </div>

                    <select onChange={changeLimit} className="limit__selection">
                    {limitOptions.map((optionLimit,idx)=>{
                        return(<option key={idx} selected={optionLimit == limit?true:false} value={optionLimit}>{optionLimit}</option>)
                    })}
                    </select>
        </div>
        <div className="buttons__container">
            <button onClick={prevPage}>Prev</button>

<div>
            {pages.slice(skip,limit).map((pageNo,idx)=>{
                            return(
                                <>
                                    <span onClick={()=>setSkip((pageNo-1)*limit)} style={{marginRight:'10px',background:currPage==pageNo?'lightGray':''}} key={pageNo+1}>{pageNo}</span>
                                   
                                </>
                            )
                        })}
 <span>...</span>
                        </div>


            <button onClick={nextPage}>Next</button>
        </div>
        </>
    )
}