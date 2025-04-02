import {OrderTable} from "../../components/admin/OrderTable.jsx";


export function OrderManager() {
    return (
        <div className="mx-auto flex h-screen w-full flex-col items-center bg-gray-100 overflow-y-auto">
            <h2>Order Manager</h2>
            <div className="h-[100px]">
                <OrderTable sort={'get-pending'}/>
                <OrderTable sort={'get-confirm'}/>
                <OrderTable/>
            </div>

        </div>
    )
}