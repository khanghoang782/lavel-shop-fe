import AxiosClient from "../../services/api/AxiosClient.js";
import {useEffect, useState} from "react";


export function FormSelectAttribute({groupId=0,groupName="TEST",setSelectedAttribute}) {
    const [attributes, setAttributes] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
        getAttributes()
    },[])
    const getAttributes = () => {
        AxiosClient.get(`/attribute/${groupId}`)
            .then((response) => {
                //console.log(response);
                setAttributes(response.data);
            }).catch((error) => {
                console.log(error);
        })
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900">{groupName}: </label>
            <div className="flex">
                <select className="min-w-[80px]" value={selectedValue}
                        onChange={(event) => setSelectedValue(event.target.value)} defaultValue={0}>
                    <option value="0">Choice Attribute</option>
                    {
                        attributes.map(item => (
                            <option key={item.id} value={item.id}>{item.attribute_name}</option>
                        ))
                    }
                </select>
                <button
                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 w-32" onClick={() => setSelectedAttribute((prev)=>[...prev,selectedValue])}>Add</button>
            </div>
        </div>
    )
}