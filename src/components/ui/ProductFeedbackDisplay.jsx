

export function ProductFeedbackDisplay({data}) {
    const DEFAULT_SELECTED_STAR =()=> {
        return <svg className="w-6 h-6 ms-2 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>;
    };
    const DEFAULT_STAR=()=> {
        return <svg className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>;
    };
    const selectedStar=data.rating?data.rating:5;
    let starLIst=Array(5).fill(DEFAULT_STAR);
    function formatDate(dateTime) {
        const date = new Date(dateTime);


        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
    }
    return (
        <div>
            <div className="flex w-full justify-between">
                <div className="flex">
                    <h2 className="ml-2 font-semibold text-2xl my-2">{data.name}</h2>
                    <div className="flex items-center">
                        {
                            starLIst.map((item, index) => (
                                (index+1)<=selectedStar?<DEFAULT_SELECTED_STAR key={index}/>:<DEFAULT_STAR key={index}/>
                            ))
                        }
                    </div>
                </div>
                <p className="mr-2 text-xl mt-3 italic">
                    {formatDate(data.created_at)}
                </p>
            </div>
            <p className="bg-gray-100 rounded-lg py-1.5 px-2 mb-4">
                {data.feedback}
            </p>
        </div>
    )
}