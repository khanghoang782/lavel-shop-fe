import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosClient from "../../services/api/AxiosClient.js";


export function OrderTable({sort="get-all"}){
    const [orderList,setOrderList]=useState([]);
    const [page, setPage] = useState({current:1,last:1});
    const navigate = useNavigate();
    useEffect(() => {
        initTable();

    },[]);
    const initTable = async () => {
        AxiosClient.get(`/admin/order?sort=${sort}`).then(({data}) => {
            setOrderList(data.data);
            setPage({current:1,last:data.last_page});
        }).catch((err) => {
            console.log(err);
        })
    }
    function viewOrderDetail(id){
        navigate(`/admin/order/${id}`);
    }
    const getNextPage = async () => {
        let nextPage=page.current+1;
        if(nextPage<=page.last){
            setOrderList([]);
            AxiosClient.get(`/admin/order?sort=${sort}&&page=${nextPage}`).then(({data}) => {
                setOrderList(data.data);
                setPage((prevPage) => ({ ...prevPage, current: nextPage }));
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    const getPrevPage = async () => {
        const prevPage=page.current-1;
        if(prevPage>=1){
            setOrderList([]);
            AxiosClient.get(`/admin/order?sort=${sort}&&page=${prevPage}`).then(({data}) => {
                setOrderList(data.data);
                setPage((prevPageStage) => ({ ...prevPageStage, current: prevPage }));
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div className="bg-white mb-5">
            <div className="my-2 pl-2">
                <button
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">Refresh
                </button>
                <Link
                    to={"/admin/addproduct"}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add</Link>
            </div>
            <table className="bg-white w-[1200px]">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Action</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                    {
                        orderList.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button type="button"
                                                onClick={()=>viewOrderDetail(item.id)}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Action
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex pt-4">
                <button
                    onClick={()=>getPrevPage()}
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Previous
                </button>
                <button
                    onClick={()=>getNextPage()}
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Next
                </button>
            </div>
        </div>
    )
}