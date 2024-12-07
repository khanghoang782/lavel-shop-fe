import defaultProductImg from "/defaultProductImg.png";
import {Link} from "react-router-dom";

export function ItemDisplayB(){
    return (
        <div className="group relative">
            <img
                src={defaultProductImg}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"/>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link>
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            Basic Tee
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
            </div>
        </div>
    )
}