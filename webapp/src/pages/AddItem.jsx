import React from 'react';
import API from '../services/api'; 
import './AddItem.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddItem(){
    const [itemname, setItemName] = React.useState('');
    const [itemweight, setWeight] = React.useState('');
    const [itemprice, setPrice] = React.useState(0);
    const [image, setImage] = React.useState(null);

    // Example static items data
    const exampleItems = [
        { id: 1, itemname: 'Bread', itemweight: '500g', itemprice: 2.5 },
        { id: 2, itemname: 'Croissant', itemweight: '100g', itemprice: 1.2 },
        { id: 3, itemname: 'Bagel', itemweight: '300g', itemprice: 3.0 },
    ];

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
        <>
            <Navbar />
            <div className="additem-container">
                <h1>Item adding part</h1>
                <form className="additem-form" onSubmit={itemAdd}>
                    <input type="text" placeholder="Enter item name" value={itemname} onChange={(e) => setItemName(e.target.value)} required />
                    <input type="text" placeholder="Enter item weight" value={itemweight} onChange={(e) => setWeight(e.target.value)} required />
                    <input type="number" placeholder="Enter item price" value={itemprice} onChange={(e) => setPrice(e.target.value)} required />
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                    <button type="submit">Add Item</button>
                </form>

                <h2>Items List</h2>
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Weight</th>
                            <th>Price ($)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exampleItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.itemname}</td>
                                <td>{item.itemweight}</td>
                                <td>{item.itemprice.toFixed(2)}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => alert(`Edit item ${item.id}`)}>Edit</button>
                                    <button className="delete-btn" onClick={() => alert(`Delete item ${item.id}`)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default AddItem;
