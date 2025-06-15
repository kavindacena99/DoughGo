import React from 'react';
import API from '../services/api'; 

function AddItem(){
    const [itemname, setItemName] = React.useState('');
    const [itemweight, setWeight] = React.useState('');
    const [itemprice, setPrice] = React.useState(0);
    const [image, setImage] = React.useState(null);

    const itemAdd = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");

            if(token){
                console.log("OK");
            }

            const formData = new FormData();
            formData.append('itemname', itemname);
            formData.append('itemweight', itemweight);
            formData.append('itemprice', itemprice);
            formData.append('image', image);

            await API.post("/item/additem", formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });

            alert("Item added successfully!");
            setItemName('');
            setWeight('');
            setPrice(0);
        }catch(error){
            alert("Item addition failed!");
        }
    };

    return(
        <div>
            <h1>Item adding part</h1>
            <form onSubmit={itemAdd}>
                <input type="text" placeholder="Enter item name" value={itemname} onChange={(e) => setItemName(e.target.value)} required /><br />
                <input type="text" placeholder="Enter item weight" value={itemweight} onChange={(e) => setWeight(e.target.value)} required /><br />
                <input type="number" placeholder="Enter item price" value={itemprice} onChange={(e) => setPrice(e.target.value)} required /><br />
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required /><br />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItem;