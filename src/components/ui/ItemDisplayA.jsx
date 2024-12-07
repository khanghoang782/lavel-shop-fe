import defaultProductImg from "*.png";

export function ItemDisplayA() {
    return (
        <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
                <img src={defaultProductImg} alt="product 1" className="w-[300px] h-[240px]"/>
            </div>
            <div className="pt-4 pb-3 px-4">
                <a href="#">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        Guyer
                        Chair</h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">$45.00</p>
                </div>
            </div>
            <button className="w-full py-1 text-center text-black bg-blue-400 border border-primary">Add to cart
            </button>
        </div>
    )
}